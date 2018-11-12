help:
	@echo "use \"make build\" to check building for production"
	@echo "use \"make deploy\" to build for production and push"

build:
	rm -rf node_modules
	yarn install
	yarn build

deploy: build
	rsync -v -essh -a dist/* status2@status.dedis.ch:www/ng

