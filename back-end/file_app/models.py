from django.db import models
from inventory_app.models import Inventory_Item
from user_app.models import User

class UploadedFile(models.Model):
    file = models.FileField(upload_to='proof-of-purchase/{user_folder}/')
    result_text = models.TextField(null=True)
    inventory_item = models.OneToOneField(Inventory_Item, on_delete=models.CASCADE, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @classmethod
    def sort(cls, user_folder, *args, **kwargs):
        kwargs['upload-to'] = f'proof-of-purchase/{user_folder}/'
        return cls(*args, **kwargs)