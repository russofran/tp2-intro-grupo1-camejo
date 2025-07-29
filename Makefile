.PHONY: start-db run-backend

start-db:
	docker compose up --build postgres

stop-db:
	docker compose down postgres_db_tienda

start-backend:
	cd backend/ && npm run dev_wsl || npm run dev

run-backend:
	start-db start-backend

start-frontend:
	docker compose up --build frontend

stop-frontend:
	docker compose down frontend