package initer

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/imega/iul/config"
	"github.com/imega/iul/serverenv"
	httpwares "github.com/improbable-eng/go-httpwares"
	http_logrus "github.com/improbable-eng/go-httpwares/logging/logrus"
	http_ctxtags "github.com/improbable-eng/go-httpwares/tags"
	"github.com/sirupsen/logrus"
)

// InitHTTP create a HTTP-server with graceful shutdown
// It reads the variables of environment
// HTTP_ADDR is TCP address to listen on, if empty will set 0.0.0.0:8080
// HTTP_READTIMEOUT is the maximum duration for reading the entire request,
// including the body. If empty will set 2 seconds.
// HTTP_WRITETIMEOUT is the maximum duration before timing out
// writes of the response. If empty will set 2 seconds.
//
// Example
//
// var logger = initer.InitLogger("my-test-server")
//
// func main() {
//     mux := http.NewServeMux()
//     mux.HandleFunc("/", handler)
//     initer.InitHTTP(logger, mux, "PREFIX_")
//
//     logger.Info("server is started")
//     serverenv.LoopUntilShutdown(15 * time.Second)
//     logger.Info("server is stopped")
// }
//
// func handler(w http.ResponseWriter, r *http.Request) {
//     if r.Method != http.MethodPost {
//         w.WriteHeader(http.StatusBadRequest)
//         return
//     }
// }
func InitHTTP(logger *logrus.Entry, handler http.Handler, prefix string) {
	var (
		rt, wt       int
		addr         string
		readTimeout  string
		writeTimeout string
	)

	addr = config.GetConfigValue(prefix + "HTTP_ADDR")
	if len(addr) < 1 {
		addr = "0.0.0.0:8080"
	}

	readTimeout = config.GetConfigValue(prefix + "HTTP_READTIMEOUT")
	rt, err := strconv.Atoi(readTimeout)
	if err != nil {
		rt = 2
	}

	writeTimeout = config.GetConfigValue(prefix + "HTTP_WRITETIMEOUT")

	wt, err = strconv.Atoi(writeTimeout)
	if err != nil {
		wt = 2
	}

	var opts []http_logrus.Option

	opts = append(opts, http_logrus.WithDecider(
		func(w httpwares.WrappedResponseWriter, r *http.Request) bool {
			return w.StatusCode() != http.StatusOK
		}),
	)

	httpServer := &http.Server{
		Addr: addr,
		Handler: http_ctxtags.Middleware("http")(
			http_logrus.Middleware(logger, opts...)(handler),
		),
		ReadTimeout:  time.Duration(time.Duration(rt) * time.Second),
		WriteTimeout: time.Duration(time.Duration(wt) * time.Second),
	}

	ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)
	serverenv.RegisterShutdownFunc(func() {
		if err := httpServer.Shutdown(ctx); err != nil {
			logger.Errorf("failed to shutdown %s httpServer, %s", prefix, err)
		}
	})

	go func() {
		if err := httpServer.ListenAndServe(); err != nil {
			switch err {
			case http.ErrServerClosed:
				logger.Infof("%s %s", prefix, err)
			default:
				logger.Errorf("failed to serve %shttp: %s", prefix, err)
			}
		}
	}()
}
