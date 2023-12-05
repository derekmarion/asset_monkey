from django.db import models
from django.contrib.auth.models import AbstractUser
from item_app.models import Item


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    all_items = models.ManyToManyField(
        Item,
        related_name="user",
    )
