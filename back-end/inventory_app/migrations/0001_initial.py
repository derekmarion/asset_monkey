# Generated by Django 5.0 on 2023-12-19 22:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Inventory_Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('category', models.CharField(default='category')),
                ('name', models.CharField(default='name')),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('serial_num', models.CharField(default='#')),
                ('proof_of_purchase', models.CharField(default='path')),
                ('user_inventory', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='inventory_app.inventory')),
            ],
        ),
    ]
