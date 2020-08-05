package health

import (
	"testing"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/health/grpc_health_v1"
)

func TestRegisterResourceHealthCheck_RegistersHealthCheck(t *testing.T) {
	s.probes = []HealthCheckFunc{}
	RegisterHealthCheckFunc(func() bool {
		return true
	})

	if len(s.probes) != 1 {
		t.Fatalf("RegisterHealthCheckFunc does not adds health check funcs to server probes")
	}
}

func TestCheck_ExecutesResourceHealthCheckFuncs(t *testing.T) {
	s.probes = []HealthCheckFunc{}
	executed := false

	RegisterHealthCheckFunc(func() bool {
		executed = true
		return executed
	})

	s.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})

	if executed != true {
		t.Fatalf("health check server does not executes registered health checks")
	}
}

func TestCheck_AllChecksPassed_ReportsStatusSERVING(t *testing.T) {
	s.probes = []HealthCheckFunc{}

	RegisterHealthCheckFunc(func() bool {
		return true
	})

	resp, err := s.Check(context.Background(), &grpc_health_v1.HealthCheckRequest{})
	if err != nil {
		t.Fatalf("health check server does not expected to return error")
	}

	if resp.GetStatus() != grpc_health_v1.HealthCheckResponse_SERVING {
		t.Fatalf("health check expected to report SERVING status")
	}
}

func TestCheck_AnyCheckFailed_ReportsStatusNOT_SERVING(t *testing.T) {
	s.probes = []HealthCheckFunc{}

	RegisterHealthCheckFunc(func() bool {
		return true
	})

	RegisterHealthCheckFunc(func() bool {
		return false
	})

	resp, _ := s.Check(
		context.Background(),
		&grpc_health_v1.HealthCheckRequest{},
	)

	if resp.GetStatus() != grpc_health_v1.HealthCheckResponse_NOT_SERVING {
		t.Fatal("health check expected to report NOT_SERVING status")
	}
}

func TestResiterHealthServer_HealthServerIsRegistered(t *testing.T) {
	srv := grpc.NewServer()
	RegisterHealthServer(srv)

	info := srv.GetServiceInfo()
	if _, ok := info["grpc.health.v1.Health"]; !ok {
		t.Fatalf("failed registers a service")
	}
}
