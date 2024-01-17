.DEFAULT_GOAL := help
.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "%-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build server's image
	@docker compose build server

up: ## Start Server and DB containers
	@docker compose up -d

db: ## Start Database containers only
	@docker compose up -d postgres

down: ## Stop Server and DB containers
	@docker compose down

db-exec: ## Access bash in postgres container
	@docker compose exec -it postgres bash

server-logs: ## View logs of the server container
	@docker compose logs -f server

db-logs: ## View logs of the postgres container
	@docker compose logs -f postgres

tag-and-push-image: ## Tag and push image to Docker Hub
	@if [ -z "$(OLD_TAG)" ] || [ -z "$(NEW_TAG)" ]; then \
		echo "Please provide OLD_TAG, NEW_TAG parameters"; \
		exit 1; \
	fi
	@docker tag orochiteam/itss2:$(OLD_TAG) orochiteam/itss2:$(NEW_TAG) && \
	docker push orochiteam/itss2:$(NEW_TAG)