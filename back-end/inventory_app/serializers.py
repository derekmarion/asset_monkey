from rest_framework import serializers
from .models import Inventory, Inventory_Item

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory_Item
        fields = '__all__'