from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.admin import InlineModelAdmin

from . import models

User = get_user_model()


# Register your models here.

class ProfileInline(InlineModelAdmin):
    model = models.Profile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = [
        ProfileInline
    ]


@admin.register(models.MasterCpu)
class CPUAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterGpu)
class GPUAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterCompany)
class CompanyAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterScreen)
class ScreenTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterScreenResolution)
class ScreenResolutionAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterTypeLaptop)
class TypeLaptopAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterMemory)
class MemoryTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.MasterDataset)
class DatasetAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
