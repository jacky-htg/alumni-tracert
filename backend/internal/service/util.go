package service

import (
	"math/rand"
	"regexp"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func generateRandomPassword() string {
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

func checkStrongPassword(password string) error {
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
