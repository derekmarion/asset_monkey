from django.urls import path
from .views import UpdateUpload, CreateUpload

urlpatterns = [
    path('upload/<int:item_id>/', UpdateUpload.as_view(), name='update_upload'),
    path('upload/', CreateUpload.as_view(), name='upload'),
]


