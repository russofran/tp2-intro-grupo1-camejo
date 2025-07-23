.PHONY: start-db run-backend

start-db:
	cd ./backend && docker compose up --build postgres

stop-db:
	cd ./backend && docker compose down postgres_db_tienda

start-backend:
	cd ./backend && npm run dev

run-backend:
	start-db start-backend

start-frontend:
	cd ./frontend && docker compose up --build frontend

stop-frontend:
	cd ./frontend && docker compose down frontend