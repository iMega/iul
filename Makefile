REPO = github.com/imega/iul
IMG = imega/iul
TAG = latest
CWD = /go/src/$(REPO)
GO_IMG = golang:1.14.6-alpine3.12
NODE_IMG = node:14.3.0-alpine3.11

build: lint node_modules
	@docker run --rm -v $(CURDIR):/data -w /data $(NODE_IMG) \
		sh -c "npm run build && node dist/ssr.js && rm dist/ssr.js"
	@docker build \
		--build-arg GO_IMG=$(GO_IMG) \
		--build-arg CWD=$(CWD) \
		-t $(IMG):$(TAG) .

lint:
	@-docker run --rm -t -v $(CURDIR):$(CWD) -w $(CWD) -e GOFLAGS=-mod=vendor \
		golangci/golangci-lint golangci-lint run

release: build login
	@docker push $(IMG):$(TAG)

node_modules:
	@docker run --rm -v $(CURDIR):/data -w /data $(NODE_IMG) npm install

clean:
	docker-compose rm -sfv

dev:
	docker-compose up -d

acceptance: down
	@IMG=$(IMG) TAG=$(TAG) GO_IMG=$(GO_IMG) CWD=$(CWD) docker-compose up -d --build --scale acceptance=0
	@IMG=$(IMG) TAG=$(TAG) GO_IMG=$(GO_IMG) CWD=$(CWD) docker-compose up --abort-on-container-exit acceptance

down:
	@IMG=$(IMG) TAG=$(TAG) GO_IMG=$(GO_IMG) CWD=$(CWD) docker-compose down -v --remove-orphans

login:
	@docker login --username $(DOCKER_USER) --password $(DOCKER_PASS)

deploy:
	@curl -s -X POST -H "TOKEN: $(DEPLOY_TOKEN)" https://d.imega.ru -d '{"namespace":"imega", "project_name":"iul", "tag":"$(TAG)"}'

test: build acceptance
