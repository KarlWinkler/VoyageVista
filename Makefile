BACKEND_CONTAINER ?= 'seng513-202401-group-14-backend-1'
FRONTEND_CONTAINER ?= 'seng513-202401-group-14-frontend-1'
DATABASE_CONTAINER ?= 'seng513-202401-group-14-db-1'

build:
	@docker-compose build

up:
	@docker-compose up

down:
	@docker-compose down

makemigrations:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py makemigrations

migrate:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py migrate

shell:
	@docker exec -it ${BACKEND_CONTAINER} sh -c '/bin/bash'

db:
	@docker exec -it ${DATABASE_CONTAINER} psql -U postgres

superuser:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py createsuperuser

seed:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py loaddata

dump:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py dumpdata --exclude auth.permission --exclude contenttypes --exclude admin.logentry --exclude sessions.session > fixtures.json
