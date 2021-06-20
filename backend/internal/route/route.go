package route

import (
	"database/sql"

	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	"tracert/internal/service"
	"tracert/proto"
)

// GrpcRoute func
func GrpcRoute(grpcServer *grpc.Server, db *sql.DB, log *logrus.Entry) {
	tracertServer := service.AlumniTracertServer{Db: db, Log: log}
	proto.RegisterTracertServiceServer(grpcServer, &tracertServer)
}
