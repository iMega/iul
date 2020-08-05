package ctxheaders

import (
	"context"

	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"github.com/grpc-ecosystem/go-grpc-middleware/util/metautils"
	"google.golang.org/grpc"
)

// UnaryServerInterceptor provides a hook to intercept
// the execution of a unary RPC on the server for set headers
// in tags and/or in context.
//
// Example
//
// ctxheaders.UnaryServerInterceptor(
//     ctxheaders.HeadersToTags([]string{"x-req-id"}),
//     ctxheaders.HeadersToContext(map[string]string{"x-req-id": "x_req_id"}),
// ),
func UnaryServerInterceptor(opts ...Option) grpc.UnaryServerInterceptor {
	o := evaluateOptions(opts)
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		tags := grpc_ctxtags.Extract(ctx)
		for _, h := range o.HeadersToTags {
			header := getXHeaderFromMD(ctx, h)
			setXHeaderToCtxTags(tags, header)
			if v, ok := o.HeadersToContext[h]; ok {
				ctx = xHeaderToCtxValue(ctx, header, v)
			}
		}

		return handler(ctx, req)
	}
}

type xheader struct {
	Name  string
	Value string
}

func getXHeaderFromMD(ctx context.Context, header string) xheader {
	return xheader{
		Name:  header,
		Value: metautils.ExtractIncoming(ctx).Get(header),
	}
}

func setXHeaderToCtxTags(tags grpc_ctxtags.Tags, h xheader) {
	tags.Set(h.Name, h.Value)
}

func xHeaderToCtxValue(
	ctx context.Context,
	h xheader,
	key string,
) context.Context {
	k := h.Name
	if len(key) > 0 {
		k = key
	}

	return context.WithValue(ctx, k, h.Value)
}
