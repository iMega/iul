NODE_IMG = node:14.3.0-alpine3.11

build:
	echo "build"

release:
	echo "release"

node_modules:
	@docker run --rm -v $(CURDIR):/data -w /data $(NODE_IMG) npm install
