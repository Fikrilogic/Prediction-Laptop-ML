from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils.deconstruct import deconstructible
import uuid, os
import datetime

# Create your models here.

@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(uuid.uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)

path_and_rename = PathAndRename('images/product')
User = get_user_model()

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=70, blank=True, null=True)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=70, blank=True, null=True)
    phone = models.CharField(verbose_name=_("phone"), max_length=13, blank=True, null=True)

class LaptopType(models.Model):
    kode = models.UUIDField(verbose_name=_("kode"), primary_key=True, blank=False, null=False)
    name = models.CharField(verbose_name=_("name"), max_length=50, unique=True)

    class Meta:
        verbose_name = "Laptop Type"

    def __str__(self):
        return self.name