from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models

User = get_user_model()


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = [
            "user_id", 'first_name', 'last_name', 'phone'
        ]

        depth = 1


class UserSerializers(serializers.ModelSerializer):
    profile = ProfileSerializers()

    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username',
            'email',
            'password',
            'profile'
        ]
        extra_kwargs = {
            'id': {"read_only": True},
            'password': {"write_only": True}
        }

    def create(self):
        profile_data = self.validated_data.pop('profile')
        self.instance = User.objects.create_user(**self.validated_data)
        profile = models.Profile.objects.create(user_id=self.instance.id, **profile_data)
        self.instance.profile = ProfileSerializers(profile).data
        return self.instance

    def get_profile(self):
        self.instance.profile = models.Profile.objects.get(pk=self.instance.id)
        return self.instance


class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'username',
            'email',
            'password'
        ]
        extra_kwargs = {
            'id': {"read_only": True},
            'password': {"write_only": True}
        }

    def create(self):
        self.instance = User.objects.create_admin(**self.validated_data)


class CpuSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterCpu
        fields = '__all__'


class GpuSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterGpu
        fields = '__all__'


class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterCompany
        fields = '__all__'


class ScreenSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterScreen
        fields = '__all__'


class ResolutionSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterScreenResolution
        fields = '__all__'


class TypeLaptopSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterTypeLaptop
        fields = '__all__'


class MemoryTypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterMemory
        fields = '__all__'


class KebutuhanSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterKebutuhan
        fields = '__all__'


class DatasetSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.MasterDataset
        fields = [
            'id',
            'kebutuhan',
            'budget',
            'cpu',
            'gpu',
            'ram',
            'memory',
            'screen',
            'resolution',
            'weight',
            'type',
            'price',
            'name'
        ]
        depth = 1


class LaptopSerializers(serializers.Serializer):
    class Meta:
        model = models.MasterLaptop
        fields = '__all__'
        depth = 1
