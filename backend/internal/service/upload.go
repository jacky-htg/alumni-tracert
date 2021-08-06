package service

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"mime/multipart"
	"net/http"
	"strconv"
	"time"
	"tracert/internal/model"
	"tracert/internal/pkg/oss"

	"github.com/gabriel-vasile/mimetype"
)

type Upload struct {
	Db *sql.DB
}

// UploadedFileStruct struct
type UploadedFileStruct struct {
	file       multipart.File
	fileHeader *multipart.FileHeader
	fileType   string
}

func (u *Upload) UploadHandler(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Content-Type", "application/json; charset=utf-8")

	token := req.Header.Get("token")
	if len(token) <= 0 {
		resp.WriteHeader(http.StatusBadRequest)
		resp.Write([]byte("pleaw suply valid token"))
		return
	}

	if len(req.FormValue("module")) <= 0 {
		resp.WriteHeader(http.StatusBadRequest)
		resp.Write([]byte("pleaw suply valid module"))
		return
	}

	uploadedFile, err := uploadHelper(resp, req)
	if err != nil {
		resp.WriteHeader(http.StatusInternalServerError)
		resp.Write([]byte(err.Error()))
		return
	}

	file := uploadedFile.file
	// header := uploadedFile.fileHeader
	// fileType := uploadedFile.fileType

	var userModel model.User
	userModel.Pb.Token = token
	userModel.GetUserLogin(req.Context(), u.Db)

	tUnix := time.Now().Unix()
	fileName := req.FormValue("module") + fmt.Sprintf("/%d-", tUnix) + strconv.Itoa(int(userModel.Pb.Id)) + ".pdf"

	err = oss.UploadDocument(fileName, file)
	if err != nil {
		resp.WriteHeader(http.StatusInternalServerError)
		resp.Write([]byte(err.Error()))
		return
	}

	list := map[string]string{
		"message": "Success",
		"path":    fileName,
	}

	data, err := json.Marshal(list)
	if err != nil {
		resp.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp.WriteHeader(http.StatusOK)
	if _, err := resp.Write(data); err != nil {
		log.Println("error writing result", err)
	}
}

func uploadHelper(w http.ResponseWriter, r *http.Request) (UploadedFileStruct, error) {
	const MB = 1 << 22
	const filePath = ""

	uploadedFile := UploadedFileStruct{}

	// Create a buffer to store the header of the file in
	fileHeaderByte := make([]byte, 512)

	// parsing from form
	r.ParseMultipartForm(5 * MB)

	// Limit upload size
	r.Body = http.MaxBytesReader(w, r.Body, 5*MB)

	file, header, err := r.FormFile("file")
	if err != nil {
		return uploadedFile, err
	}
	defer file.Close()

	// Copy the headers into the FileHeader buffer
	if _, err := file.Read(fileHeaderByte); err != nil {
		return uploadedFile, err
	}

	// set position back to start.
	if _, err := file.Seek(0, 0); err != nil {
		return uploadedFile, err
	}

	mime := mimetype.Detect(fileHeaderByte)
	uploadedFile = UploadedFileStruct{
		file:       file,
		fileHeader: header,
		fileType:   mime.String(), // http.DetectContentType(fileHeaderByte),
	}
	return uploadedFile, err
}
