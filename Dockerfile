ARG GO_IMG

FROM $GO_IMG as builder
ENV GOFLAGS=-mod=vendor
ARG CWD
WORKDIR $CWD

COPY . .

RUN go run -tags=dev assets/generate.go && ls -l && go build -v -o rel/app




FROM $GO_IMG
ARG CWD
WORKDIR /
EXPOSE 8080
RUN apk add --upd wkhtmltopdf ttf-liberation
COPY --from=builder $CWD/rel/app .

CMD ["/app"]
