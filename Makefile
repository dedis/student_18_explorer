help:
	@echo "use \"make deploy\" to build for production and push"

deploy:
	yarn build
	rsync -v -essh -a dist/* status2@status.dedis.ch:www/ng

