ARG GO_IMG

FROM $GO_IMG as builder
ARG CWD
ARG TAG
WORKDIR $CWD

COPY . .

RUN apk add --upd musl-dev gcc && \
    go get -u github.com/go-bindata/go-bindata/... && \
    go-bindata -nocompress -o pdf.go pdf.html && \
    #go get github.com/fullstorydev/grpcurl@v1.7.0 && \
    #go install github.com/fullstorydev/grpcurl/cmd/grpcurl && \
    #go list ./... | grep -v 'assets\|tests' | xargs go test && \
    go run -tags=dev assets/generate.go && \
    go build -ldflags "-X main.tag=$TAG" -v -o rel/app




FROM $GO_IMG
ARG CWD
WORKDIR /
EXPOSE 8080
RUN apk add --upd wkhtmltopdf ttf-liberation
COPY --from=builder $CWD/rel/app .
# COPY --from=builder /go/bin/grpcurl .
# HEALTHCHECK --interval=10s --timeout=2s \
# CMD grpcurl -plaintext -d {} 127.0.0.1:9000 grpc.health.v1.Health.Check | grep -w "SERVING"
CMD ["/app"]
