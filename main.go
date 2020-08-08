package main

import (
	"net/http"
	"strings"
	"time"

	"github.com/imega/iul/health"
	"github.com/imega/iul/initer"
	"github.com/imega/iul/serverenv"
)

const shutdownTimeout = 15

var tag string

func main() {
	var logger = initer.InitLogger("iul")

	mux := http.NewServeMux()
	mux.Handle("/", defaultURI(http.FileServer(Assets)))
	mux.HandleFunc("/api/gendoc", generateHandler)
	mux.HandleFunc("/api/upload", uploadHandler)

	initer.InitHTTP(logger, mux, "")
	initer.InitGRPC(logger, nil)

	health.RegisterHealthCheckFunc(func() bool {
		return true
	})

	logger.Infof("server is started, tag: %s", tag)
	err := serverenv.LoopUntilShutdown(shutdownTimeout * time.Second)
	if err != nil {
		logger.Errorf("failed to shutdown server, %s", err)
	}
	logger.Infof("server is stopped, tag: %s", tag)
}

func defaultURI(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var estimatedURL string

		if strings.HasSuffix(r.URL.Path, "/") {
			estimatedURL = "/index.htm"
		}

		if strings.HasPrefix(r.URL.Path, "/"+tag) {
			estimatedURL = strings.Replace(r.URL.Path, "/"+tag, "", 1)
		}

		r.URL.Path = estimatedURL

		next.ServeHTTP(w, r)
	})
}
