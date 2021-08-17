package oss

import (
	"bytes"
	"encoding/base64"
	"errors"
	"mime/multipart"
	"os"
	"strings"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
)

// UploadBase64 file
func UploadBase64(bucketName string, name string, file string) error {
	// Create an OSSClient instance.
	client, err := oss.New(os.Getenv("OSS_ENDPOINT"), os.Getenv("OSS_ACCESS_KEY_ID"), os.Getenv("OSS_ACCESS_KEY_SECRET"))
	if err != nil {
		return err
	}

	// Obtain the bucket.
	bucket, err := client.Bucket(bucketName)
	if err != nil {
		return err
	}

	// image validation.
	i := strings.Index(file, ",")
	if i < 0 {
		return errors.New("Please suplay valid base64 file")
	}

	i2 := strings.Index(file, ";")
	if i2 < 0 {
		return errors.New("Please suplay valid base64 file")
	}

	//obj, err := base64.StdEncoding.DecodeString(file[i+1:])
	obj, err := base64.StdEncoding.DecodeString(file[strings.IndexByte(file, ',')+1:])
	if err != nil {
		return err
	}

	return bucket.PutObject(name, bytes.NewReader(obj))
}

// UploadFileStream : upload file
func UploadFileStream(bucketName string, name string, file multipart.File) error {
	// Create an OSSClient instance.
	client, err := oss.New(os.Getenv("OSS_ENDPOINT"), os.Getenv("OSS_ACCESS_KEY_ID"), os.Getenv("OSS_ACCESS_KEY_SECRET"))
	if err != nil {
		return err
	}

	// Obtain the bucket.
	bucket, err := client.Bucket(bucketName)
	if err != nil {
		return err
	}

	return bucket.PutObject(name, file)
}

// UploadLocalFile : upload file
func UploadLocalFile(bucketName string, name string, file string) error {
	// Create an OSSClient instance.
	client, err := oss.New(os.Getenv("OSS_ENDPOINT"), os.Getenv("OSS_ACCESS_KEY_ID"), os.Getenv("OSS_ACCESS_KEY_SECRET"))
	if err != nil {
		return err
	}

	// Obtain the bucket.
	bucket, err := client.Bucket(bucketName)
	if err != nil {
		return err
	}

	return bucket.PutObjectFromFile(name, file)
}

// UploadDocument to OSS
func UploadDocument(name string, file multipart.File) error {
	return UploadFileStream(os.Getenv("OSS_BUCKET_DOCUMENT"), name, file)
}

// Delete image OSS
func Delete(objectName string, bucketName string) error {

	// Create an OSSClient instance.
	client, err := oss.New(os.Getenv("OSS_ENDPOINT"), os.Getenv("OSS_ACCESS_KEY_ID"), os.Getenv("OSS_ACCESS_KEY_SECRET"))
	if err != nil {
		return err
	}

	// Obtain the bucket.
	bucket, err := client.Bucket(bucketName)
	if err != nil {
		return err
	}

	// Delete an object.
	return bucket.DeleteObject(objectName)
}
