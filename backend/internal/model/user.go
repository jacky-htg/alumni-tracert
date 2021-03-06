package model

import (
	"context"
	"database/sql"
	"strings"
	"time"
	"tracert/internal/pkg/token"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type User struct {
	Pb       proto.User
	Password string
}

func (u *User) Login(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	var password string
	var isActived bool
	query := ` SELECT id, password, name, user_type, is_actived FROM users WHERE email = ?`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare statement: %v", err)
	}
	defer stmt.Close()

	err = stmt.QueryRowContext(ctx, u.Pb.Email).Scan(&u.Pb.Id, &password, &u.Pb.Name, &u.Pb.UserType, &isActived)

	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "Query Raw: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "Query Raw: %v", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(password), []byte(u.Password))
	if err != nil {
		return status.Errorf(codes.NotFound, "Invalid Password: %v", err)
	}

	if !isActived {
		return status.Errorf(codes.NotFound, "inactived user")
	}

	return nil
}

func (u *User) Create(ctx context.Context, db *sql.Tx) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO users (email, password, name, user_type) VALUES (?, ?, ?, ?)`

	pass, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return status.Errorf(codes.Internal, "hash password: %v", err)
	}

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	res, err := stmt.ExecContext(ctx,
		u.Pb.Email,
		string(pass),
		u.Pb.Name,
		u.Pb.UserType,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	id, err := res.LastInsertId()
	if err != nil {
		return status.Errorf(codes.Internal, "get result id: %v", err)
	}

	u.Pb.Id = uint64(id)

	return nil
}

func (u *User) ChangePassword(ctx context.Context, db *sql.Tx) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `UPDATE users SET password = ? WHERE id = ?`

	pass, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return status.Errorf(codes.Internal, "hash password: %v", err)
	}

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare update: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		string(pass),
		u.Pb.Id,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec update: %v", err)
	}

	return nil
}

func (u *User) GetUserLogin(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	isValid, email := token.ValidateToken(u.Pb.Token)
	if !isValid {
		return status.Error(codes.Unauthenticated, "Invalid Token")
	}
	u.Pb.Email = email

	query := ` 
		SELECT users.id, users.name, users.user_type, alumni.id 
		FROM users  
		LEFT JOIN alumni ON users.id = alumni.user_id
		WHERE users.email = ?`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare statement: %v", err)
	}
	defer stmt.Close()

	var alumni Alumni
	var id sql.NullInt64
	err = stmt.QueryRowContext(ctx, u.Pb.Email).Scan(&u.Pb.Id, &u.Pb.Name, &u.Pb.UserType, &id)
	alumni.Pb.Id = uint64(id.Int64)
	u.Pb.Alumni = &alumni.Pb

	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "Query Raw: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "Query Raw: %v", err)
	}

	return nil
}

func (u *User) ListQuery(ctx context.Context, db *sql.DB, in *proto.ListInput) (string, []interface{}, *proto.ListInput, error) {
	select {
	case <-ctx.Done():
		return "", nil, nil, util.ContextError(ctx)
	default:
	}

	query := `SELECT id, email, name, is_actived, user_type, created, updated FROM users`
	where := []string{}
	paramQueries := []interface{}{}

	if len(in.Search) > 0 {
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		where = append(where, `(name LIKE ? OR email LIKE ?)`)
	}

	{
		qCount := `SELECT COUNT(*) FROM users`
		if len(where) > 0 {
			qCount += " WHERE " + strings.Join(where, " AND ")
		}
		var count int
		err := db.QueryRowContext(ctx, qCount, paramQueries...).Scan(&count)
		if err != nil && err != sql.ErrNoRows {
			return query, paramQueries, in, status.Error(codes.Internal, err.Error())
		}

		in.Count = uint32(count)
	}

	if len(where) > 0 {
		query += ` WHERE ` + strings.Join(where, " AND ")
	}

	if len(in.OrderBy) == 0 || !(in.OrderBy == "name" || in.OrderBy == "email" || in.OrderBy == "id") {
		if in == nil {
			in = &proto.ListInput{OrderBy: "created"}
		} else {
			in.OrderBy = "created"
		}
	}

	query += ` ORDER BY ` + in.OrderBy

	if len(in.Sort) > 0 {
		sort := strings.ToLower(in.Sort)
		if sort == "desc" {
			query += ` ` + sort
		} else {
			in.Sort = "asc"
		}
	}

	if in.Limit > 0 {
		query += ` LIMIT ? OFFSET ?`
		page := in.Page
		if page < 1 {
			page = 1
		}
		offset := (page - 1) * in.Limit
		paramQueries = append(paramQueries, in.Limit, offset)
	}

	return query, paramQueries, in, nil
}

func (u *User) Get(ctx context.Context, db *sql.DB) error {
	query := `
		SELECT id, email, name, is_actived, user_type, created, updated 
		FROM users
		WHERE id = ?
	`

	row := db.QueryRowContext(ctx, query, u.Pb.Id)
	var createdAt, updatedAt time.Time
	err := row.Scan(
		&u.Pb.Id, &u.Pb.Email, &u.Pb.Name, &u.Pb.IsActived, &u.Pb.UserType, &createdAt, &updatedAt,
	)
	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "not found: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "scan data: %v", err)
	}

	u.Pb.Created = createdAt.String()
	u.Pb.Updated = updatedAt.String()

	return nil
}

func (u *User) GetByEmail(ctx context.Context, db *sql.DB) error {
	query := `
		SELECT id, email, name, is_actived, user_type, created, updated 
		FROM users
		WHERE email = ?
	`

	row := db.QueryRowContext(ctx, query, u.Pb.Email)
	var createdAt, updatedAt time.Time
	err := row.Scan(
		&u.Pb.Id, &u.Pb.Email, &u.Pb.Name, &u.Pb.IsActived, &u.Pb.UserType, &createdAt, &updatedAt,
	)
	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "not found: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "scan data: %v", err)
	}

	u.Pb.Created = createdAt.String()
	u.Pb.Updated = updatedAt.String()

	return nil
}

func (u *User) GetByPassword(ctx context.Context, db *sql.DB) error {
	var strPassword string
	query := `SELECT id, password FROM users WHERE id = ?`
	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare statement: %v", err)
	}
	defer stmt.Close()

	err = stmt.QueryRowContext(ctx, u.Pb.GetId()).Scan(&u.Pb.Id, &strPassword)

	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "Query Raw: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "Query Raw: %v", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(strPassword), []byte(u.Password))
	if err != nil {
		return status.Errorf(codes.NotFound, "Invalid Password: %v", err)
	}

	return nil
}

func (u *User) GetAdmin(ctx context.Context, db *sql.DB) ([]*proto.User, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	var list []*proto.User
	rows, err := db.QueryContext(ctx, `SELECT name, email FROM users WHERE user_type = 3`)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			return nil, err
		}

		var pbUser proto.User
		err = rows.Scan(&pbUser.Name, &pbUser.Email)
		if err != nil {
			return nil, status.Errorf(codes.Internal, "scan data: %v", err)
		}

		list = append(list, &pbUser)
	}

	if rows.Err() != nil {
		return nil, status.Error(codes.Internal, rows.Err().Error())
	}

	return list, nil
}

func (u *User) GetPejabat(ctx context.Context, db *sql.DB) ([]*proto.User, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	var list []*proto.User
	rows, err := db.QueryContext(ctx, `SELECT name, email FROM users WHERE user_type = 4`)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			return nil, err
		}

		var pbUser proto.User
		err = rows.Scan(&pbUser.Name, &pbUser.Email)
		if err != nil {
			return nil, status.Errorf(codes.Internal, "scan data: %v", err)
		}

		list = append(list, &pbUser)
	}

	if rows.Err() != nil {
		return nil, status.Error(codes.Internal, rows.Err().Error())
	}

	return list, nil
}
