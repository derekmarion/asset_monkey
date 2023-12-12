from django.db import models
from user_app.models import User


# Create your models here.
class Inventory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)


class Inventory_Item(models.Model):
    user_inventory = models.ForeignKey(
        Inventory, on_delete=models.CASCADE, default=None
    )
    quantity = models.IntegerField(default=1)
    category = models.CharField(default="category")
    name = models.CharField(default="name")
    price = models.DecimalField(decimal_places=2, max_digits=10, default=00.00)
    serial_num = models.CharField(default="#")
    # We actually won't need this because the file has a FK rel to this item
    proof_of_purchase = models.CharField(default="path")