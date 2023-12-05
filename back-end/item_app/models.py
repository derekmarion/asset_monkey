from django.db import models


# Create your models here.
class Item(models.Model):
    category = models.CharField(default="category")
    name = models.CharField(default="name")
    price = models.DecimalField(decimal_places=2, max_digits=10, default=00.00)
    serial_num = models.CharField(default="#")
    # This will be a URL to the location of pop document on filesystem
    proof_of_purchase = models.CharField(default="path")
