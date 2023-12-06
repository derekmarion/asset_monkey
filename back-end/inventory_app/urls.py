from django.urls import path
from .views import All_Items, Inventory_Manager, Item

urlpatterns = [
    path('inventory_manager/', Inventory_Manager.as_view(), name='inventory_manager'),
    path('all_items/', All_Items.as_view(), name='all_items'),
    # path('category/<str:category>/', Item_By_Category.as_view(), name='items_by_category'),
    path('all_items/<int:item_id>/', Item.as_view(), name='item'),
    path('all_items/add/', Item.as_view(), name="add_item"),
]


