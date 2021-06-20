package service

import (
	"database/sql"

	"github.com/sirupsen/logrus"
)

type AlumniTracertServer struct {
	Db  *sql.DB
	Log *logrus.Entry
}
