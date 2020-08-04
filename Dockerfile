ARG GO_IMG

FROM $GO_IMG as builder
ENV GOFLAGS=-mod=vendor
ARG CWD
WORKDIR $CWD

COPY . .

RUN go build -v -o rel/app




FROM $GO_IMG
ARG CWD
WORKDIR /
EXPOSE 8080
COPY --from=builder $CWD/rel/app .

CMD ["/app"]