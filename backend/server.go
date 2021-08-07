package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"

	"tracert/internal/config"
	"tracert/internal/pkg/db/mysql"
	"tracert/internal/pkg/log/logruslog"
	"tracert/internal/route"
	"tracert/internal/service"
)

type RpcServer struct {
	Grpc        *grpc.Server
	WrappedGrpc *grpcweb.WrappedGrpcServer
}

func NewServer() *RpcServer {
	gs := grpc.NewServer()
	return &RpcServer{
		Grpc:        gs,
		WrappedGrpc: grpcweb.WrapServer(gs),
	}
}

func main() {
	_, ok := os.LookupEnv("APP_ENV")
	if !ok {
		config.Setup(".env")
	}

	if err := run(); err != nil {
		log.Printf("error: shutting down: %s", err)
		os.Exit(1)
	}
}

func run() error {
	port := map[string]string{"grpc": "9099", "web": "8099"}
	rpcServer := NewServer()

	db, err := mysql.Open()
	if err != nil {
		return fmt.Errorf("connecting to db: %v", err)
	}
	defer db.Close()

	log := logruslog.Init()

	route.GrpcRoute(rpcServer.Grpc, db, log)

	var uploadService service.Upload
	uploadService.Db = db

	errChan := make(chan error)
	go func() {
		errChan <- runRpcServer(port["grpc"], rpcServer)
	}()

	go func() {
		errChan <- runWebServer(port["web"], rpcServer, uploadService)
	}()

	select {
	case e := <-errChan:
		if e != nil {
			return e
		}
	}

	return nil
}

func runRpcServer(port string, rpcServer *RpcServer) error {
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return err
	}

	if err := rpcServer.Grpc.Serve(listener); err != nil {
		return err
	}
	return nil
}

func runWebServer(httpPort string, rpcServer *RpcServer, uploadService service.Upload) error {
	grpc := rpcServer.WrappedGrpc

	http.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		allowCors(resp, req)
		if grpc.IsGrpcWebRequest(req) || grpc.IsAcceptableGrpcCorsRequest(req) {
			grpc.ServeHTTP(resp, req)
		}
	})

	http.HandleFunc("/upload", func(resp http.ResponseWriter, req *http.Request) {
		allowCors(resp, req)
		switch req.Method {
		case http.MethodPost:
			uploadService.UploadHandler(resp, req)
		default:
			http.NotFound(resp, req)
		}
	})

	err := http.ListenAndServe(":"+httpPort, nil)
	if err != nil {
		return err
	}

	return nil
}

func allowCors(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Access-Control-Allow-Origin", "*")
	resp.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	resp.Header().Set("Access-Control-Expose-Headers", "grpc-status, grpc-message")
	resp.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, XMLHttpRequest, x-user-agent, x-grpc-web, grpc-status, grpc-message, token")
}
