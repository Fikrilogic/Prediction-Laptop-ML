from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator

from .utils import PathAndRename

import uuid

model_path = PathAndRename('file/model')

User = get_user_model()


# Create your models here.
class MasterModel(models.Model):
    class Status(models.TextChoices):
        PROD = 'PROD', _('Production')
        DEV = 'DEV', _('Development')

    id = models.UUIDField(verbose_name=_('kode_metode'), default=uuid.uuid4, primary_key=True)
    name = models.CharField(verbose_name=_('name'), max_length=70, null=False, blank=False, unique=True)
    path = models.FileField(verbose_name=_('path'), upload_to=model_path, validators=[FileExtensionValidator(['pkl'])])
    desc = models.CharField(verbose_name=_('deskripsi'), max_length=255, blank=True, null=True)
    upload_at = models.DateTimeField(verbose_name=_('created_at'), auto_now=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.name


class MasterKonsultasi(models.Model):
    class Ram(models.IntegerChoices):
        VL = 2, 'Very Low'
        LW = 4, 'Low'
        IM = 8, 'Intermediate'
        HG = 16, 'High'
        VHG = 32, 'Very High'

    id = models.UUIDField(verbose_name=_('kode_konsultasi'), default=uuid.uuid4, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    kebutuhan = models.CharField(max_length=150, null=False, blank=False)
    budget = models.BigIntegerField()
    cpu = models.CharField(max_length=150, null=False, blank=False)
    gpu = models.CharField(max_length=150, null=False, blank=False)
    ram = models.IntegerField(verbose_name=_('ram'), default=Ram.IM, choices=Ram.choices, null=False)
    memory = models.CharField(verbose_name=_('Memory_type'), null=False, blank=False, max_length=50)
    company = models.CharField(verbose_name=_("company"), max_length=100, null=False, blank=False)
    screen = models.CharField(verbose_name=_('screen_type'), max_length=150, null=False, blank=False)
    resolution = models.CharField(verbose_name=_('screen_resolution'), max_length=150, null=False, blank=False)
    weight = models.DecimalField(max_digits=3, decimal_places=2)
    type_laptop = models.CharField(verbose_name=_('type_laptop'), max_length=100, null=False, blank=False)
    price = models.BigIntegerField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']


class MasterHasil(models.Model):
    id = models.UUIDField(verbose_name=_('kode_test_hasil'), primary_key=True, default=uuid.uuid4)
    konsultasi = models.ForeignKey(MasterKonsultasi, on_delete=models.CASCADE)
    predict = models.CharField(verbose_name=_('prediksi'), max_length=50)
    model = models.ForeignKey(MasterModel, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['-created_at']

    def __str__(self):
        return self.predict


class MasterTrainingResult(models.Model):
    id = models.AutoField(primary_key=True)
    method = models.ForeignKey(MasterModel, on_delete=models.CASCADE, unique=True)
    accuracy = models.DecimalField(max_digits=10, decimal_places=7)
    precision = models.DecimalField(max_digits=10, decimal_places=7)
    recall = models.DecimalField(max_digits=10, decimal_places=7)
    f1_score = models.DecimalField(max_digits=10, decimal_places=7)
    knn_k = models.IntegerField(default=0)
    train_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        get_latest_by = ['train_at']


class MasterCrossvalResult(models.Model):
    model = models.OneToOneField(MasterModel, on_delete=models.CASCADE, unique=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    kfold = models.IntegerField(default=10)
    test1 = models.DecimalField(max_digits=7, decimal_places=5)
    test2 = models.DecimalField(max_digits=7, decimal_places=5)
    test3 = models.DecimalField(max_digits=7, decimal_places=5)
    test4 = models.DecimalField(max_digits=7, decimal_places=5)
    test5 = models.DecimalField(max_digits=7, decimal_places=5)
    test6 = models.DecimalField(max_digits=7, decimal_places=5)
    test7 = models.DecimalField(max_digits=7, decimal_places=5)
    test8 = models.DecimalField(max_digits=7, decimal_places=5)
    test9 = models.DecimalField(max_digits=7, decimal_places=5)
    test10 = models.DecimalField(max_digits=7, decimal_places=5)
    mean = models.DecimalField(max_digits=7, decimal_places=5)
    train_at = models.DateTimeField(auto_now=True)

    class Meta:
        get_latest_by = ['train_at']
