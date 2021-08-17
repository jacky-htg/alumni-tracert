package myimage

import (
	"fmt"
	"image"
	"image/color"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"os"
)

func ToGray(r io.Reader) (*image.Gray, error) {
	// Decode image to JPEG
	img, _, err := image.Decode(r)
	if err != nil {
		return nil, err
	}

	// Converting image to grayscale
	grayImg := image.NewGray(img.Bounds())

	/*for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
		for x := img.Bounds().Min.X; x < img.Bounds().Max.X; x++ {
			grayImg.Set(x, y, img.At(x, y))
		}
	} */

	for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
		for x := img.Bounds().Min.X; x < img.Bounds().Max.X; x++ {
			R, G, B, _ := img.At(x, y).RGBA()
			//Luma: Y = 0.2126*R + 0.7152*G + 0.0722*B
			Y := (0.2126*float64(R) + 0.7152*float64(G) + 0.0722*float64(B)) * (255.0 / 65535)
			grayPix := color.Gray{uint8(Y)}
			grayImg.Set(x, y, grayPix)
		}
	}

	return grayImg, nil
}

func ToMonochrome(r io.Reader) (*image.Gray, error) {
	// Decode image to JPEG
	img, _, err := image.Decode(r)
	if err != nil {
		return nil, err
	}

	// Converting image to grayscale
	grayImg := image.NewGray(img.Bounds())

	for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
		for x := img.Bounds().Min.X; x < img.Bounds().Max.X; x++ {
			R, G, B, _ := img.At(x, y).RGBA()
			Y := (299*float64(R) + 587*float64(G) + 114*float64(B) + 500) / 1000
			monoPix := color.White
			if uint16(Y) < 0x8000 {
				monoPix = color.Black
			}
			grayImg.Set(x, y, monoPix)
		}
	}

	return grayImg, nil
}

func SaveToFile(img image.Image, imgType string, filename string) error {
	f, err := os.Create(filename + "." + imgType)
	if err != nil {
		return err
	}
	defer f.Close()

	switch imgType {
	case "png":
		err = png.Encode(f, img)
	case "jpg":
		err = jpeg.Encode(f, img, nil)
	case "jpeg":
		err = jpeg.Encode(f, img, nil)
	case "gif":
		err = gif.Encode(f, img, nil)
	default:
		err = fmt.Errorf("invalid image type. please suplay type as png, jeg, jpeg, or gif")
	}

	return err
}
