from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.utils.deconstruct import deconstructible
from django.core.validators import FileExtensionValidator
import uuid, os
import datetime


# Create your models here.

@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        name = filename.split('.')[0]
        # set filename as random string
        filename = '{}_{}.{}'.format(name, uuid.uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)


path_and_rename = PathAndRename('images/product')
dataset_path = PathAndRename("file/dataset")
User = get_user_model()


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=70, blank=True, null=True)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=70, blank=True, null=True)
    phone = models.CharField(verbose_name=_("phone"), max_length=13, blank=True, null=True)


class Dataset(models.Model):
    id = models.UUIDField(verbose_name=_("id"), unique=True, primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Name"), max_length=100, blank=False, null=False)
    path = models.FileField(verbose_name=_("path"),
                            upload_to="file/dataset",
                            validators=[FileExtensionValidator(allowed_extensions=['xlsx'])]
                            )

    class Meta:
        verbose_name = _("Dataset")
        verbose_name_plural = _("Datasets")
        db_table = _("dataset")


class Specification(models.Model):

    id = models.AutoField(verbose_name=_("id"), primary_key=True)
    dataset = models.ForeignKey(Dataset, on_delete=models.SET_NULL, blank=True, null=True)
    budget = models.CharField(verbose_name=_("budget"), max_length=255, null=True, blank=True)
    cpu = models.CharField(verbose_name=_("cpu"), max_length=255, null=True, blank=True)
    gpu = models.CharField(verbose_name=_("gpu"), max_length=255, null=True, blank=True)
    ram = models.IntegerField(verbose_name=_("ram"), null=True, blank=True)
    memory_type = models.CharField(verbose_name=_("memory"), max_length=255, null=True, blank=True)
    company = models.CharField(verbose_name=_("company"), max_length=255, null=True, blank=True)
    screen_type = models.CharField(verbose_name=_("screen_type"), max_length=255, null=True, blank=True)
    screen_resolution = models.CharField(verbose_name=_("screen_resolution"), max_length=255, null=True, blank=True)
    weight = models.DecimalField(verbose_name=_("weight"), max_digits=3, decimal_places=2, null=True, blank=True)
    type_laptop = models.CharField(verbose_name=_("type_laptop"), max_length=255, null=True, blank=True)
    kebutuhan = models.CharField(verbose_name=_("kebutuhan"), max_length=255, null=False, blank=False)

    class Meta:
        verbose_name=_("Specification")
        verbose_name_plural = _("Specifications")
        db_table = _("specification")
        ordering = ['-id']

