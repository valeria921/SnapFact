#!/bin/bash

python manage.py migrate

python manage.py createsuperuser --noinput || true

python manage.py seed

python manage.py collectstatic --noinput

python manage.py runserver 0.0.0.0:8000

exec "$@"