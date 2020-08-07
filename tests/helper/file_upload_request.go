package helper

import (
	"bytes"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
)

// FileUploadRequest creates a new file upload http request
// with optional extra params
func FileUploadRequest(
	uri string,
	params map[string]string,
	paramName, path string,
) (*http.Request, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	fileContents, err := ioutil.ReadAll(file)
	if err != nil {
		return nil, err
	}
	fi, err := file.Stat()
	if err != nil {
		return nil, err
	}
	file.Close()

	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile(paramName, fi.Name())
	if err != nil {
		return nil, err
	}

	if _, err := part.Write(fileContents); err != nil {
		return nil, err
	}

	for key, val := range params {
		if err := writer.WriteField(key, val); err != nil {
			return nil, err
		}
	}

	if err := writer.Close(); err != nil {
		return nil, err
	}

	request, err := http.NewRequest(http.MethodPost, uri, body)
	if err != nil {
		return nil, err
	}
	request.Header.Add("Content-Type", writer.FormDataContentType())

	return request, nil
}
