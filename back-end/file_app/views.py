from django.shortcuts import get_object_or_404
from .models import UploadedFile
from .helpers import perform_ocr, parse_text
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)
from user_app.models import User
from inventory_app.models import Inventory_Item, Inventory


# Create your views here.
# This class uploads a file and creates a new inventory item based on its contents
class CreateUpload(APIView):
    def post(self, request):
        user = request.user
        user_folder = request.user
        uploaded_file = request.FILES["file"]
        # Create file and assign user field as id of user making the request
        file, created = UploadedFile.sort.objects.get_or_create(
            user=User(email=user), file=uploaded_file, user_folder=user_folder
        )

        # Perform OCR
        ocr_result = perform_ocr(file.file.path)

        # Parse text
        parsed_text = parse_text(ocr_result)

        # Create Inventory_Item object and associate it with the uploaded file and user
        inventory_item, created = Inventory_Item.objects.get_or_create(
            user=file.user,
            defaults={
                "user_inventory": Inventory(user=user),
                "quantity": parsed_text["quantity"],
                "category": parsed_text["category"],
                "name": parsed_text["name"],
                "price": parsed_text["price"],
                "serial_num": parsed_text["serial_num"],
            },
        )

        # Associate uploaded file with recently created Inventory_Item
        file.inventory_item = inventory_item
        file.save()

        return Response(
            "File uploaded successfully, item created", status=HTTP_201_CREATED
        )


# This class uploads a file and associates it with the corresponding inventory item
class UpdateUpload(APIView):
    def post(self, request, item_id):
        new_file = request.FILES["file"]

        # Retrieve the corresponding Inventory_Item and User instance, must be saved before creating new UploadedFile obj
        inventory_item = get_object_or_404(Inventory_Item, id=item_id)
        user = get_object_or_404(User, email=request.user)
        inventory_item.save()
        user.save()
        
        # Check if an UploadedFile already exists for the given user and inventory_item
        existing_file, created = UploadedFile.objects.get_or_create(
            user=user,
            inventory_item=inventory_item,
        )

        # Update the file and save the changes
        existing_file.file.delete()
        existing_file.file = new_file
        existing_file.save()


        return Response("File uploaded successfully", status=HTTP_204_NO_CONTENT)
