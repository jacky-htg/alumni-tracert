package model

import (
	"context"
	"database/sql"
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
	var password string
	var isActived bool
	query := ` SELECT password, is_actived FROM users WHERE email = ?`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare statement: %v", err)
	}
	defer stmt.Close()

	err = stmt.QueryRowContext(ctx, u.Pb.Email).Scan(&password, &isActived)

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
