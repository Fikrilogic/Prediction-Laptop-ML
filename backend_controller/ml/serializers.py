
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


class TrainingResultSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterTrainingResult
        fields = '__all__'
        depth = 1


class CrossValidationSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterCrossvalResult
        fields = '__all__'
        exclude = [
            'id', 'kfold', 'train_at', 'model_id', 'mean'
        ]
