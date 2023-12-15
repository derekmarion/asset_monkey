from rest_framework import serializers
from .models import Inventory, Inventory_Item
from file_app.models import UploadedFile
import os

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Inventory_Item
        fields = '__all__'

    def get_file_name(self, obj):
        # Access the file name from the related UploadedFile instance, use filter to avoid not found issues
        uploaded_file = UploadedFile.objects.filter(inventory_item=obj).first()
        if uploaded_file:
            full_path = uploaded_file.file.name
            # Extract the filename from the full path
            return os.path.basename(full_path)
        return None