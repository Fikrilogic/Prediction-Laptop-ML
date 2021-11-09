from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    LaptopType,
    Laptop,
    Spesifikasi,
    Profile,
    ModelMachineLearning,

)

User = get_user_model()

class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user_id",'first_name', 'last_name', 'phone'
        ]


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
    def create(self, validated_data):
        data = validated_data.pop('profile')
        self.instance = User.objects.create_user(**validated_data)
        profile = Profile.objects.create(**data, user_id=self.instance.id)
        self.instance.profile = profile
        return self.instance

    def admin_create(self, validate_data):
        self.instance = User.objects.create_admin(**validate_data)
        return self.instance
    def getData(self, id):
        try:
            self.instance = User.objects.get(id=id)
            profile = Profile.objects.get(user_id=self.instance.id)
            self.instance.profile = profile
            return self.instance
        except:
            return None





class LaptopTypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = LaptopType
        fields = '__all__'

class LaptopSerializers(serializers.ModelSerializer):
    class Meta:
        model = Laptop
        fields = [
            'id','name', 'price', 'description', 'foto', 'type'
        ]
class SpesifikasiSerializers(serializers.ModelSerializer):
    class Meta:
        model = Spesifikasi
        fields = '__all__'

class ModelMachineSerializers(serializers.ModelSerializer):
    class Meta:
        model = ModelMachineLearning
        fields = '__all__'
