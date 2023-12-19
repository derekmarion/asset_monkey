from django.contrib import admin
from .models import Inventory_Item, Inventory

# Register your models here.
admin.site.register(Inventory)
admin.site.register(Inventory_Item)