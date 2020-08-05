package ctxheaders

import (
	"context"
	"net/http"

	http_ctxtags "github.com/improbable-eng/go-httpwares/tags"
)

// Middleware is a server-side http ware for set headers in tags
// and/or in context.
//
// Example
//
// mux := http.NewServeMux()
// mux.HandleFunc("/", handler)
// httpServer := &http.Server{
//     Addr:    "0.0.0.0:8080",
//     Handler: http_ctxtags.Middleware("http")(
//         ctxheaders.Middleware(
//             mux,
//             ctxheaders.HeadersToContext(map[string]string{
//                 "X-Req-ID": "x-req-id",
//             }),
//         ),
//     ),
// }
func Middleware(next http.Handler, opts ...Option) http.Handler {
	o := evaluateOptions(opts)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var (
			ctx  = r.Context()
			tags = http_ctxtags.ExtractInbound(r)
		)

		for k, v := range o.HeadersToContext {
			val := r.Header.Get(k)
			tags.Set(v, val)
			ctx = context.WithValue(ctx, v, val)
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
