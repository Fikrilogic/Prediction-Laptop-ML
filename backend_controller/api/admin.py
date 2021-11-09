from django.contrib import admin
from django.contrib.auth import get_user_model

# from .models import KebutuhanLaptop, NilaiSpesifikasi, Spesifikasi
from . import models

# Register your models here.
admin.site.register(models.Laptop)
admin.site.register(models.Spesifikasi)
admin.site.register(models.LaptopType)
