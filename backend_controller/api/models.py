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
    

class Laptop(models.Model):
    id = models.UUIDField(verbose_name=_("id"),default=uuid.uuid4, unique=True, primary_key=True)
    name = models.CharField(verbose_name=_("name"), null=False, max_length=150)
    merk = models.CharField(verbose_name=_("merk"),max_length=70)
    price = models.CharField(verbose_name=_("price"), null=False, max_length=100)
    type = models.ForeignKey(LaptopType, on_delete= models.DO_NOTHING)
    description = models.CharField(verbose_name=_("description"), max_length=255, null=True, blank=True)
    foto = models.ImageField(verbose_name=_("Foto Produk"), upload_to=path_and_rename)
    createAt = models.DateTimeField(verbose_name=_("createAt"), auto_now_add=True, editable=False)

    class Meta:
        verbose_name = _("Produk Laptop")
        get_latest_by = ['createAt']

    def __str__(self):
        return self.name
    def get_absolute_url(self):
        return reverse("product_detail", args=[self.name])


class Spesifikasi(models.Model):

    BUDGET = (
        ('low', '3000000 - 6999999'),
        ('mid', '7000000 - 9999999'),
        ('high', '>= 10000000')
    )

    id = models.UUIDField(verbose_name=_("id"), default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.SET("AnonymousUser"))
    budget = models.CharField(verbose_name=_("budget"), max_length=30, choices=BUDGET, default='low')
    cpu = models.CharField(verbose_name=_("processor"), max_length=70)
    gpu = models.CharField(verbose_name=_("graphic_card"), max_length=70)
    ram = models.IntegerField(verbose_name=_("ram_size"))
    tipe_memori = models.CharField(verbose_name=_("tipe_memori"), max_length=70)
    resolution = models.CharField(verbose_name=_("resolution"), max_length=70)
    merk = models.CharField(verbose_name=_("merk"), max_length=70)
    berat = models.DecimalField(verbose_name=_("merk"), max_digits=3, decimal_places=2)
    tipe = models.ForeignKey(LaptopType, on_delete=models.SET("None"))
    test = models.ForeignKey('TestModel', on_delete=models.SET("None"))
    class Meta:
        verbose_name = "Spesifikasi"

    def __str__(self):
        return self.id

class ModelMachineLearning(models.Model):
    id = models.UUIDField(verbose_name=_("id"), default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    nama = models.CharField(verbose_name=_("nama"), max_length=70, unique=True)
    file = models.FilePathField(path='./file/model')
    deskripsi = models.CharField(verbose_name=_("deskripsi"), max_length=255)

    class Meta:
        verbose_name = "Model"

    def __str__(self):
        return self.name

class Keputusan(models.Model):
    id = models.UUIDField(verbose_name=_("id"), default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    model = models.ForeignKey(ModelMachineLearning, on_delete=models.CASCADE)
    data = models.ForeignKey(Spesifikasi, on_delete=models.CASCADE)
    hasil = models.CharField(verbose_name=_("prediksi"), max_length=200)
    akurasi = models.DecimalField(verbose_name=_("akurasi"), max_digits=10, decimal_places=8)
    presisi = models.DecimalField(verbose_name=_("presisi"), max_digits=10, decimal_places=8)
    f1_score = models.DecimalField(verbose_name=_("f1_score"), max_digits=10, decimal_places=8)
    recall = models.DecimalField(verbose_name=_("recall"), max_digits=10, decimal_places=8)

    class Meta:
        verbose_name = "Hasil"

    def __str__(self):
        return f'result: {self.hasil}, akurasi {self.akurasi}'


class TestModel(models.Model):
    id = models.UUIDField(verbose_name=_("id"), default=uuid.uuid4, primary_key=True)
    model = models.ForeignKey(ModelMachineLearning, on_delete=models.CASCADE)
    akurasi = models.DecimalField(verbose_name=_("akurasi"), max_digits=10, decimal_places=8)
    presisi = models.DecimalField(verbose_name=_("presisi"), max_digits=10, decimal_places=8)
    f1_score = models.DecimalField(verbose_name=_("f1_score"), max_digits=10, decimal_places=8)
    recall = models.DecimalField(verbose_name=_("recall"), max_digits=10, decimal_places=8)
    mean = models.DecimalField(verbose_name=_("mean"), max_digits=10, decimal_places=8)
    deviasi = models.DecimalField(verbose_name=_("deviasi"), max_digits=10, decimal_places=8)

    class Meta:
        verbose_name = "TestModel"

    def __str__(self):
        return f'akurasi: {self.akurasi}, presisi: {self.presisi}, f1_score: {self.f1_score}'