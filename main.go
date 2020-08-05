package main

import (
	"net/http"
	"strings"
	"time"

	"github.com/imega/iul/initer"
	"github.com/imega/iul/serverenv"
)

const shutdownTimeout = 15

func main() {
	var logger = initer.InitLogger("iul")

	mux := http.NewServeMux()
	mux.Handle("/", defaultURI(http.FileServer(Assets)))
	mux.HandleFunc("/api/gendoc", generateHandler)
	mux.HandleFunc("/api/upload", uploadHandler)

	initer.InitHTTP(logger, mux, "")

	logger.Info("server is started")
	err := serverenv.LoopUntilShutdown(shutdownTimeout * time.Second)
	if err != nil {
		logger.Errorf("failed to shutdown server, %s", err)
	}
	logger.Info("server is stopped")
}

func defaultURI(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/") {
			r.URL.Path = "/index.htm"
		}
		next.ServeHTTP(w, r)
	})
}
