from django.db import models
from inventory_app.models import Inventory_Item
from user_app.models import User

def user_folder(instance, filename):
    # Generate the upload path based on the user's folder
    return f'proof-of-purchase/{instance.user.id}/{filename}'

class UploadedFile(models.Model):
    file = models.FileField(upload_to=user_folder)
    result_text = models.TextField(null=True)
    inventory_item = models.OneToOneField(Inventory_Item, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

