package util

import (
	"context"
	"errors"
	"image/jpeg"
	"io"
	"math/rand"
	"net/http"
	"os"
	"regexp"
	"time"
	"tracert/internal/pkg/app"

	"github.com/boombuler/barcode"
	"github.com/boombuler/barcode/qr"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

// ContextError func
func ContextError(ctx context.Context) error {
	switch ctx.Err() {
	case context.Canceled:
		return status.Error(codes.Canceled, "request is canceled")
	case context.DeadlineExceeded:
		return status.Error(codes.DeadlineExceeded, "deadline is exceeded")
	default:
		return nil
	}
}

func GenerateRandomPassword() string {
	rand.Seed(time.Now().UnixNano())
	digits := "0123456789"
	specials := "~=+%^*/()[]{}/!@#$?|"
	all := "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		digits + specials
	length := 10
	buf := make([]byte, length)
	buf[0] = digits[rand.Intn(len(digits))]
	buf[1] = specials[rand.Intn(len(specials))]
	for i := 2; i < length; i++ {
		buf[i] = all[rand.Intn(len(all))]
	}
	rand.Shuffle(len(buf), func(i, j int) {
		buf[i], buf[j] = buf[j], buf[i]
	})
	str := string(buf)

	return str
}

func CheckStrongPassword(password string) error {
	if len(password) < 10 {
		return status.Error(codes.InvalidArgument, "password min 10 character")
	}

	num := `[0-9]{1}`
	az := `[a-z]{1}`
	AZ := `[A-Z]{1}`
	symbol := `[!@#~$%^&*()+|_]{1}`

	if b, err := regexp.MatchString(num, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need num :%v", err)
	}
	if b, err := regexp.MatchString(az, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need a_z :%v", err)
	}
	if b, err := regexp.MatchString(AZ, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need A_Z :%v", err)
	}
	if b, err := regexp.MatchString(symbol, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need symbol :%v", err)
	}

	return nil
}

func GetMetadata(ctx context.Context) (context.Context, error) {
	select {
	case <-ctx.Done():
		return ctx, ContextError(ctx)
	default:
	}

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return ctx, status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}

	token := md["token"]
	if len(token) == 0 {
		return ctx, status.Errorf(codes.Unauthenticated, "authorization token is not provided")
	}

	ctx = context.WithValue(ctx, app.Ctx("token"), token[0])

	return ctx, nil
}

func LogError(log *logrus.Entry, message string, err error) {
	if st, ok := status.FromError(err); ok {
		err = errors.New(st.Message())
	}
	log.Errorf(message+" %s", err)
}

func CreateQrCode(certificate string, id string) error {
	// Create the barcode
	qrCode, err := qr.Encode("https://anter.poltekkes-medan.ac.id/"+certificate+"/"+id, qr.M, qr.Auto)
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}

	// Scale the barcode to 200x200 pixels
	qrCode, err = barcode.Scale(qrCode, 200, 200)
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}

	// create the output file
	file, err := os.Create("qrCode-" + certificate + "-" + id + ".jpg")
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}
	defer file.Close()

	// encode the barcode as png
	jpeg.Encode(file, qrCode, nil)

	return nil
}

func DownloadFile(filepath string, url string) error {

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}
