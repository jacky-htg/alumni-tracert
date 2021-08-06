package main

import (
	"io"
	"net/http"
	"os"
)

func main() {
	/* pdf := gopdf.GoPdf{}
	pdf.Start(gopdf.Config{PageSize: *gopdf.PageSizeA4})
	pdf.AddPage()

	// Import page 1
	tpl1 := pdf.ImportPage("ijazah.pdf", 1, "/MediaBox")

	// Draw pdf onto page
	pdf.UseImportedTemplate(tpl1, 0, 0, 595, 0)

	pdf.Image("./stempel-sign.png", 75, 75, nil) //print image

	pdf.WritePdf("image.pdf")
	*/

	downloadFile("ijazah.pdf", "https://bpodt-staging.oss-ap-southeast-5.aliyuncs.com/ijazah/1628243662-1.pdf")
}

func downloadFile(filepath string, url string) error {

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
