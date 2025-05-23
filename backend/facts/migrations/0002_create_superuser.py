# Generated by Django 5.2 on 2025-04-21 20:31
import os

from django.utils import timezone
from django.db import migrations


def create_superuser(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if User.objects.exists():
        return

    superuser = User.objects.create_superuser(
        username=os.environ.get("DJANGO_SUPERUSER_USERNAME"),
        email=os.environ.get("DJANGO_SUPERUSER_EMAIL"),
        password=os.environ.get("DJANGO_SUPERUSER_PASSWORD"),
        last_login=timezone.now(),
    )
    superuser.save()

class Migration(migrations.Migration):
        dependencies = [
            ('facts', '0001_initial'),
        ]

        operations = [
        migrations.RunPython(create_superuser),
        ]
