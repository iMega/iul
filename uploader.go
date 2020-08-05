package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"io"
	"net/http"

	"github.com/dustin/go-humanize"
	"github.com/improbable-eng/go-httpwares/logging/logrus/ctxlogrus"
)

type fileInfo struct {
	Name string `json:"name"`
	Size string `json:"size"`
	MD5  string `json:"md5"`
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	logger := ctxlogrus.Extract(ctx)

	if r.Method != http.MethodPost {
		logger.Error("bad request method")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := r.ParseMultipartForm(int64(100000000)); err != nil {
		logger.Errorf("failed to handle multipart form, %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var responseFiles []fileInfo
	for _, files := range r.MultipartForm.File {
		for i := range files {
			file, err := files[i].Open()
			defer file.Close()
			if err != nil {
				logger.Errorf("failed to open file from multipart form, %s", err)
			}

			responseFiles = append(responseFiles, fileInfo{
				Name: files[i].Filename,
				Size: humanize.Bytes(uint64(files[i].Size)),
				MD5:  hashFileMD5(file),
			})
		}
	}

	type response struct {
		Files []fileInfo `json:"files"`
	}

	resp := response{
		Files: responseFiles,
	}

	b, err := json.Marshal(resp)
	if err != nil {
		logger.Errorf("failed to marshal response, %s", err)
	}

	w.Write(b)
}

func hashFileMD5(f io.Reader) string {
	hash := md5.New()
	if _, err := io.Copy(hash, f); err != nil {
		return ""
	}

	hashInBytes := hash.Sum(nil)[:16]

	return hex.EncodeToString(hashInBytes)
}
