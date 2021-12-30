from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Profile,
    Dataset,
    Specification
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
    def create(self):
        data = self.validated_data.pop('profile')
        self.instance = User.objects.create_user(**self.validated_data)
        data['user_id'] = self.instance.id
        profile = ProfileSerializers(data=data)
        if profile.is_valid(raise_exception=True):
            self.instance.profile = profile
            return self.instance

    def admin_create(self):
        self.instance = User.objects.create_admin(**self.validated_data)
        return self.instance

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = "__all__"

class SpecificationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields= "__all__"

