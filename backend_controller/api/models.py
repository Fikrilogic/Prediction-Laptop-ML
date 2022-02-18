from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from .utils import PathAndRename

import uuid

# Create your models here.


path_and_rename = PathAndRename('images/product')
dataset_path = PathAndRename("file/dataset")
User = get_user_model()


class BaseDatasetComponent(models.Model):
    id = models.UUIDField(verbose_name=_('id'), primary_key=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

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


class MasterCpu(BaseDatasetComponent):
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.name


class MasterGpu(BaseDatasetComponent):
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.name


class MasterCompany(BaseDatasetComponent):
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.name


class MasterScreen(BaseDatasetComponent):
    type = models.CharField(verbose_name=_('type'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.type


class MasterScreenResolution(BaseDatasetComponent):
    resolution = models.CharField(verbose_name=_('resolusi'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.resolution


class MasterTypeLaptop(BaseDatasetComponent):
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.name


class MasterMemory(BaseDatasetComponent):
    type = models.CharField(verbose_name=_('type'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

    def __str__(self):
        return self.type


class MasterKebutuhan(BaseDatasetComponent):
    name = models.CharField(verbose_name=_('name'), max_length=50, blank=False, null=False, unique=True)

    class Meta:
        get_latest_by = ['created_at']

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


class MasterLaptop(models.Model):

    class Ram(models.IntegerChoices):
        VL = 2, '2GB'
        LW = 4, '4GB'
        IM = 8, '8GB'
        HG = 16, '16GB'
        VHG = 32, '32GB'

    id = models.UUIDField(verbose_name=_("id"), default=uuid.uuid4, primary_key=True, null=False, unique=False)
    name = models.CharField(verbose_name=_("name"), null=False, blank=False, max_length=150)
    processor = models.CharField(verbose_name=_("processor"), null=False, blank=False, max_length=150)
    gpu = models.CharField(verbose_name=_("gpu"), null=False, blank=False, max_length=150)
    ram = models.BigIntegerField(choices=Ram.choices, default=Ram.IM, null=False, blank=False)
    memory = models.CharField(verbose_name=_("memory_type"), null=False, blank=False, max_length=150)
    memory_size = models.CharField(verbose_name=_("memory_size"), null=False, blank=False, max_length=150)
    screen = models.CharField(verbose_name=_("screen"), null=False, blank=False, max_length=150)
    company = models.ForeignKey(MasterCompany, on_delete=models.SET_NULL, null=True)
    weight = models.DecimalField(max_digits=3, decimal_places=2)
    price = models.BigIntegerField()
    description = models.CharField(verbose_name=_("description"), max_length=150)

    def __str__(self):
        return self.name