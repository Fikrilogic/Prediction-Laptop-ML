from django.contrib.auth import get_user_model

from . import models
from rest_framework import serializers


class ModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterModel
        fields = '__all__'


class KonsultasiSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterKonsultasi
        exclude = [
            'user'
        ]


class ResultSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterHasil
        fields = '__all__'
