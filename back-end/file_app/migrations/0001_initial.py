# Generated by Django 5.0 on 2023-12-19 22:20

import django.db.models.deletion
import file_app.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventory_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UploadedFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to=file_app.models.user_folder)),
                ('result_text', models.TextField(null=True)),
                ('inventory_item', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory_app.inventory_item')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]