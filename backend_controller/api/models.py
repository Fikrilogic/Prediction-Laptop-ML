from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.utils.deconstruct import deconstructible

import uuid
import os


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
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(verbose_name=_(
        "First Name"), max_length=70, blank=True, null=True)
    last_name = models.CharField(verbose_name=_(
        "Last Name"), max_length=70, blank=True, null=True)
    phone = models.CharField(verbose_name=_(
        "phone"), max_length=13, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class MasterCpu(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name


class MasterGpu(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name


class MasterCompany(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name


class MasterScreen(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    type = models.CharField(verbose_name=_('type'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.type


class MasterScreenResolution(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    resolution = models.CharField(verbose_name=_('resolusi'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.resolution


class MasterTypeLaptop(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name


class MasterMemory(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    type = models.CharField(verbose_name=_('type'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.type


class MasterKebutuhan(models.Model):
    """
        Model for Table Master Dataset
    """

    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name


class MasterDataset(models.Model):
    """
        Model for Table Master Dataset
    """

    class Ram(models.IntegerChoices):
        VL = 2, '2GB'
        LW = 4, '4GB'
        IM = 8, '8GB'
        HG = 16, '16GB'
        VHG = 32, '32GB'

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    kebutuhan = models.ForeignKey(MasterKebutuhan, on_delete=models.SET_NULL, null=True)
    budget = models.IntegerField()
    cpu = models.ForeignKey(MasterCpu, on_delete=models.SET_NULL, null=True)
    gpu = models.ForeignKey(MasterGpu, on_delete=models.SET_NULL, null=True)
    ram = models.BigIntegerField(choices=Ram.choices, default=Ram.IM)
    memory = models.ForeignKey(MasterMemory, on_delete=models.SET_NULL, null=True)
    company = models.ForeignKey(MasterCompany, on_delete=models.SET_NULL, null=True)
    screen = models.ForeignKey(MasterScreen, on_delete=models.SET_NULL, verbose_name=_('screen_type'), null=True)
    resolution = models.ForeignKey(MasterScreenResolution, on_delete=models.SET_NULL,
                                   verbose_name=_('screen_resolution'),
                                   null=True)
    weight = models.DecimalField(max_digits=3, decimal_places=2)
    type = models.ForeignKey(MasterTypeLaptop, on_delete=models.SET_NULL, verbose_name=_('type_laptop'), null=True)
    price = models.BigIntegerField()
    name = models.CharField(verbose_name=_('name'), max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name
