.PHONY: start-db run-backend

install-container:
	docker compose up --build

start-db:
	docker compose up --build postgres

stop-db:
	docker compose down postgres_db_tienda

start-backend:
	cd backend/ && npm run dev || npm run dev_wsl

run-backend:
	start-db start-backend

start-frontend:
	docker compose up --build frontend

stop-frontend:
	docker compose down frontend