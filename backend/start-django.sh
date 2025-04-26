#!/bin/bash
set -e

echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready"

python manage.py migrate

# Attempt to create superuser, ignore error if already exists
python manage.py createsuperuser --noinput || true

python manage.py seed

python manage.py collectstatic --noinput

gunicorn backend.wsgi:application --bind 0.0.0.0:8000
