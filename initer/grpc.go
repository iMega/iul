package initer

import (
	"net"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_logrus "github.com/grpc-ecosystem/go-grpc-middleware/logging/logrus"
	grpc_recovery "github.com/grpc-ecosystem/go-grpc-middleware/recovery"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"github.com/imega/iul/handlers"
	"github.com/imega/iul/health"
	"github.com/imega/iul/serverenv"
	ctxheaders "github.com/imega/iul/xheaders"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

var (
	grpcSrv *grpc.Server
)

type RegisterServices func(srv *grpc.Server)

func InitGRPC(logger *logrus.Entry, rs RegisterServices) {
	rOpts := []grpc_recovery.Option{
		grpc_recovery.WithRecoveryHandler(handlers.RecoveryHandler),
	}

	loggerOpts := []grpc_logrus.Option{
		grpc_logrus.WithDecider(func(methodFullName string, err error) bool {
			if err == nil && methodFullName == "/grpc.health.v1.Health/Check" {
				return false
			}
			return true
		}),
	}

	grpcSrv = grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(),
			grpc_logrus.UnaryServerInterceptor(logger, loggerOpts...),
			ctxheaders.UnaryServerInterceptor(
				ctxheaders.HeadersToTags([]string{"x-req-id"}),
			),
			grpc_recovery.UnaryServerInterceptor(rOpts...),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_recovery.StreamServerInterceptor(rOpts...),
		),
	)

	health.RegisterHealthServer(grpcSrv)

	serverenv.RegisterShutdownFunc(func() {
		grpcSrv.GracefulStop()
	})

	l, err := net.Listen("tcp", "0.0.0.0:9000")
	if err != nil {
		logger.Errorf("failed to listen on the TCP network address 0.0.0.0:9000, %s", err)
	}

	if rs != nil {
		rs(grpcSrv)
	}

	go func() {
		if err := grpcSrv.Serve(l); err != nil {
			logger.Errorf("failed to serve grpc: %s", err)
		}
	}()
}
