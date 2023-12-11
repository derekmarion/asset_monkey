from django.db import models
from inventory_app.models import Inventory_Item
from user_app.models import User

class UploadedFile(models.Model):
    file = models.FileField(upload_to='proof-of-purchase/{user}/')
    result_text = models.TextField(null=True)
    inventory_item = models.ForeignKey(Inventory_Item, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)