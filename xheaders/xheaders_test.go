package ctxheaders

import (
	"context"
	"encoding/json"
	"reflect"
	"testing"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	grpc_testing "github.com/grpc-ecosystem/go-grpc-middleware/testing"
	testproto "github.com/grpc-ecosystem/go-grpc-middleware/testing/testproto"
	"github.com/grpc-ecosystem/go-grpc-middleware/util/metautils"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

var (
	goodPing = &testproto.PingRequest{Value: "something", SleepTimeMs: 9999}

	goodPingValue = &testproto.PingRequest{Value: "ctxValue", SleepTimeMs: 9999}
)

type XHeadersSuite struct {
	*grpc_testing.InterceptorTestSuite
}

type xheadersAssertService struct {
	testproto.TestServiceServer
}

func (s *xheadersAssertService) Ping(
	ctx context.Context,
	ping *testproto.PingRequest,
) (*testproto.PingResponse, error) {
	if ping.Value == "ctxValue" {
		return &testproto.PingResponse{Value: ctx.Value("req_id").(string)},
			nil
	}

	value := grpc_ctxtags.Extract(ctx).Values()
	str, _ := json.Marshal(value)

	return &testproto.PingResponse{Value: string(str)}, nil
}

func TestXHeadersInterceptor(t *testing.T) {
	s := &XHeadersSuite{
		InterceptorTestSuite: &grpc_testing.InterceptorTestSuite{
			TestService: &xheadersAssertService{
				TestServiceServer: &grpc_testing.TestPingService{T: t},
			},
			ServerOpts: []grpc.ServerOption{
				grpc_middleware.WithUnaryServerChain(
					grpc_ctxtags.UnaryServerInterceptor(),
					UnaryServerInterceptor(
						HeadersToTags([]string{"x-req-id"}),
						HeadersToContext(map[string]string{
							"x-req-id": "req_id",
						}),
					),
				),
			},
		},
	}
	suite.Run(t, s)
}

func (s *XHeadersSuite) TestUnary_SuccessfulRequest_TagsContainReqID() {
	var (
		expectedHeaderName  = "x-req-id"
		expectedHeaderValue = "74b97cbc-b1b1-499d-ae38-76625b75c5c5"
	)

	ctx := s.createContextWithHeaders(
		s.SimpleCtx(),
		expectedHeaderName,
		expectedHeaderValue,
	)
	resp, err := s.Client.Ping(ctx, goodPing)
	require.NoError(s.T(), err, "there must be not be an on a successful call")

	tags := tagsFromJson(s.T(), resp.GetValue())
	assert.Equal(
		s.T(),
		tags[expectedHeaderName],
		expectedHeaderValue,
		"the tags should contain key reqID",
	)
}

func (s *XHeadersSuite) TestUnary_SuccessfulRequest_CtxValueContainReqID() {
	var (
		expectedHeaderName  = "x-req-id"
		expectedHeaderValue = "74b97cbc-b1b1-499d-ae38-76625b75c5c5"
	)

	ctx := s.createContextWithHeaders(
		s.SimpleCtx(),
		expectedHeaderName,
		expectedHeaderValue,
	)
	resp, err := s.Client.Ping(ctx, goodPingValue)
	require.NoError(s.T(), err, "there must be not be an on a successful call")

	assert.Equal(
		s.T(),
		resp.GetValue(),
		expectedHeaderValue,
		"the value of context should contain key reqID",
	)
}

func (s *XHeadersSuite) createContextWithHeaders(
	ctx context.Context,
	key,
	value string,
) context.Context {
	md := metadata.Pairs(key, value)
	nCtx := metautils.NiceMD(md).ToOutgoing(ctx)
	return nCtx
}

func tagsFromJson(t *testing.T, jstring string) map[string]interface{} {
	var msgMapTemplate interface{}
	err := json.Unmarshal([]byte(jstring), &msgMapTemplate)
	if err != nil {
		t.Fatalf("failed unmarshaling tags from response %v", err)
	}
	return msgMapTemplate.(map[string]interface{})
}

func Test_getXHeaderFromMD(t *testing.T) {
	suit := []struct {
		expected xheader
	}{
		{
			expected: xheader{
				Name:  "x-req-id",
				Value: "74b97cbc-b1b1-499d-ae38-76625b75c5c5",
			},
		},
		{
			expected: xheader{
				Name:  "x-req-id",
				Value: "",
			},
		},
	}

	for _, run := range suit {
		md := metadata.Pairs(run.expected.Name, run.expected.Value)
		ctx := metautils.NiceMD(md).ToIncoming(context.TODO())
		actual := getXHeaderFromMD(ctx, run.expected.Name)
		reflect.DeepEqual(run.expected, actual)
	}
}
