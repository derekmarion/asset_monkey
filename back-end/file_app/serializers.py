from rest_framework import serializers
from .models import UploadedFile

class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = '__all__'
