init:
	cd backend && go mod init tracert

gen:
	protoc --proto_path=proto proto/*.proto --go_out=plugins=grpc:./backend/proto
	protoc --proto_path=proto proto/*.proto --js_out=import_style=commonjs:./frontend/proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./frontend/proto

build:
	cd backend && CGO_ENABLED=0 GOOS=linux go build -o alumni server.go && docker build --tag=jackyhtg/alumni:$(TAG) . && docker push jackyhtg/alumni:$(TAG)

build-frontend:
	cd frontend && npm run build

deploy:
	cd frontend/public && scp -r ./* rijal:/home/smart/public_html/anter_rijalasepnugroho_com/

frontend:
	cd frontend && npm run dev

server:
	cd backend && go run server.go

.PHONY: init gen build build-frontend deploy frontend server