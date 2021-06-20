init:
	cd backend && go mod init tracert

gen:
	protoc --proto_path=proto proto/*.proto --go_out=plugins=grpc:./backend/proto
	protoc --proto_path=proto proto/*.proto --js_out=import_style=commonjs:./frontend/proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend/proto

frontend:
	cd frontend && npm run dev

server:
	cd backend && go run server.go

.PHONY: init gen frontend server