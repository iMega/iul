package main

import (
	"net/http"
	"strings"
	"time"

	"github.com/imega/iul/initer"
	"github.com/imega/iul/serverenv"
)

var logger = initer.InitLogger("iul")

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", defaultURI(http.FileServer(Assets)))

	initer.InitHTTP(logger, mux, "")

	logger.Info("server is started")
	serverenv.LoopUntilShutdown(15 * time.Second)
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
