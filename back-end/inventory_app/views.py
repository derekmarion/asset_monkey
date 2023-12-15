from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import InventorySerializer, ItemSerializer
from .models import Inventory_Item, Inventory
from rest_framework.response import Response
from user_app.models import User
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)


# Create your views here.
class Inventory_Manager(APIView):
    def post(self, request):
        user = request.user
        inventory, created = Inventory.objects.get_or_create(user=user)
        return Response("Inventory created successfully", status=HTTP_201_CREATED)

    def get(self, request):
        user = request.user
        inventory = get_object_or_404(Inventory, user=user)
        return Response(
            f"Inventory with ID {inventory.id} exists and belong to user {inventory.user}",
            status=HTTP_200_OK,
        )


class All_Items(APIView):
    def get(self, request):
        user = request.user
        print(user)
        inventory = get_object_or_404(Inventory, user=user)
        items = Inventory_Item.objects.filter(user_inventory=inventory.id)
        items_serialized = ItemSerializer(items, many=True)
        return Response(items_serialized.data, status=HTTP_200_OK)


class Item(APIView):
    def get(self, request, item_id):
        item = Inventory_Item.objects.get(id=item_id)
        item_serialized = ItemSerializer(item)
        return Response(item_serialized.data, status=HTTP_200_OK)

    def post(self, request):
        user = User.objects.get(email=request.user)
        user_inventory = Inventory.objects.get(user=user)
        new_item_data = {**request.data, 'user_inventory': user_inventory.id}
        new_item = ItemSerializer(data=new_item_data)
        if new_item.is_valid():
            new_item.save()
            return Response(new_item.data, status=HTTP_201_CREATED)
        
    def put(self, request, item_id):
        item = Inventory_Item.objects.get(id=item_id)
        item_serialized = ItemSerializer(item, data=request.data)
        if item_serialized.is_valid():
            item_serialized.save()
            return Response(item_serialized.data, status=HTTP_200_OK)
        return Response(item_serialized.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, item_id):
        item = Inventory_Item.objects.get(id=item_id)
        item.delete()

        return Response("Item removed from inventory", HTTP_200_OK)


# class Item_By_Category(APIView):
#     def get(self, request, category):
#         items = Item.objects.filter(category=category.title())
#         items_serialized = ItemSerializer(items, many=True)
#         return Response(items_serialized.data, status=HTTP_200_OK)
