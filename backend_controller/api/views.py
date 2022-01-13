from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.conf import settings
from rest_framework.generics import get_object_or_404

from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import (
    AuthenticationFailed,
    PermissionDenied,
    NotFound,
)
from rest_framework import status

from .serializers import (
    UserSerializers,
    AdminSerializers,
    ProfileSerializers,
    CpuSerializers,
    GpuSerializers,
    ScreenSerializers,
    CompanySerializers,
    MemoryTypeSerializers,
    ResolutionSerializers,
    TypeLaptopSerializers,
    DatasetSerializers,
    KebutuhanSerializers

)
from .models import (
    Profile,
    MasterCpu,
    MasterGpu,
    MasterCompany,
    MasterScreen,
    MasterMemory,
    MasterTypeLaptop,
    MasterScreenResolution,
    MasterDataset,
    MasterKebutuhan
)
from .permissions import isAdminUser, isAdminOrMemberUser, isMemberUser

from .pagination import StandardPagination

import jwt
import datetime
import pandas as pd

User = get_user_model()


# Create your views here.



# Register Member
class Register(generics.GenericAPIView):
    serializer_class = UserSerializers

    def post(self, request):
        data = self.request.data
        serializers = self.get_serializer(data=data)
        if serializers.is_valid(raise_exception=True):
            serializers.create()
            return Response(serializers.data, status=status.HTTP_201_CREATED)


# Register Admin
class RegisterAdminView(generics.GenericAPIView):
    serializer_class = AdminSerializers

    def post(self, request):
        print(self.request.data)
        data = self.request.data
        serializers = self.get_serializer(data=data)
        if serializers.is_valid(raise_exception=True):
            serializers.admin_create()
            return Response(serializers.data, status=status.HTTP_201_CREATED)


# User login
class LoginUser(generics.GenericAPIView):
    serializer_class = UserSerializers

    def post(self, request):

        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("password failed")
        if not Group.objects.get(name='member').user_set.filter(pk=user.id).exists():
            raise AuthenticationFailed("Admin Cannot Access this route")

        payload = {
            'id': str(user.id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        res = Response()
        res.set_cookie(key='jwt', value=token, httponly=True)
        res.data = {
            "jwt": token
        }
        return res


# admin login
class LoginAdmin(generics.GenericAPIView):
    serializer_class = UserSerializers

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("password failed")
        if not Group.objects.get(name='admin').user_set.filter(pk=user.id).exists():
            raise PermissionDenied("User Cannot Access this route")

        payload = {
            'id': str(user.id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        res = Response()
        res.set_cookie(key='jwt', value=token, httponly=True)
        res.data = {
            "token": token,
            "roles": "ADMIN"
        }
        return res


# all user logout
class LogoutUser(generics.GenericAPIView):
    def get(self, request):
        res = Response()
        res.delete_cookie('jwt')
        return res


# get profile user **NOT FIXED YET
class UserView(generics.GenericAPIView):
    serializer_class = UserSerializers
    permission_classes = [isMemberUser]

    def get(self, request):
        token = request.COOKIES.get('jwt')

        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms='HS256')

        user = User.objects.get(pk=payload['id'])

        if user is None:
            return NotFound()
        serialize = self.get_serializer(user).get_profile()
        return Response(serialize.data)


# User Customer Data view
class UserCustomerView(viewsets.GenericViewSet):
    serializer_class = ProfileSerializers
    queryset = Profile.objects.all()
    permission_classes = [isAdminUser]
    pagination_class = StandardPagination

    def get_permissions(self):
        if self.action == 'partial_update':
            self.permission_classes = [isMemberUser]
        else:
            self.permission_classes = [isAdminOrMemberUser]
        return super(self.__class__, self).get_permissions()

    def list(self, id=None):
        profile = self.get_queryset()
        if profile.count() < 20:
            serialize = self.get_serializer(profile, many=True)
            return Response(serialize.data)
        serialize = self.get_serializer(profile, many=True)
        return self.get_paginated_response(serialize.data)

    def retrieve(self, request, pk=None):
        query = self.get_queryset()
        profile = get_object_or_404(query, pk=pk)
        serializer = self.get_serializer(profile)
        return Response({"user": serializer.data})

    def partial_update(self, request, pk):
        query = self.get_queryset()
        profile = get_object_or_404(query, pk=pk)
        data = self.request.data
        serialize = self.get_serializer(profile, data=data, partial=True)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return Response({"user": serialize.data}, status=status.HTTP_200_OK)

    def destroy(self, pk):
        query = self.get_queryset()
        profile = get_object_or_404(query, pk=pk)
        user = User.objects.get(id=profile.user_id)
        if user is None and profile is None:
            raise NotFound()
        user.delete()
        profile.delete()
        return Response(status=status.HTTP_200_OK)


class CpuView(viewsets.ModelViewSet):
    queryset = MasterCpu.objects.all()
    serializer_class = CpuSerializers


    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class GpuView(viewsets.ModelViewSet):
    queryset = MasterGpu.objects.all()
    serializer_class = GpuSerializers
    permission_classes = [isAdminOrMemberUser]

    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class CompanyView(viewsets.ModelViewSet):
    queryset = MasterCompany.objects.all()
    serializer_class = CompanySerializers
    permission_classes = [isAdminOrMemberUser]

    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class ScreenView(viewsets.ModelViewSet):
    queryset = MasterScreen.objects.all()
    serializer_class = ScreenSerializers
    permission_classes = [isAdminOrMemberUser]


    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class ResolutionView(viewsets.ModelViewSet):
    queryset = MasterScreenResolution.objects.all()
    serializer_class = ResolutionSerializers
    permission_classes = [isAdminOrMemberUser]


    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class MemoryTypeView(viewsets.ModelViewSet):
    queryset = MasterMemory.objects.all()
    serializer_class = MemoryTypeSerializers
    permission_classes = [isAdminOrMemberUser]


    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class LaptopTypeView(viewsets.ModelViewSet):
    queryset = MasterTypeLaptop.objects.all()
    serializer_class = TypeLaptopSerializers
    permission_classes = [isAdminOrMemberUser]


    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()

class KebutuhanView(viewsets.ModelViewSet):
    queryset = MasterKebutuhan.objects.all()
    serializer_class = KebutuhanSerializers
    permission_classes = [isAdminOrMemberUser]


    def get_permissions(self):
        if self.action == 'retrieve':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()


class DatasetView(viewsets.ModelViewSet):
    queryset = MasterDataset.objects.all()
    serializer_class = DatasetSerializers
    pagination_class = StandardPagination

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [isAdminOrMemberUser]
        else:
            self.permission_classes = [isAdminUser]
        return super(self.__class__, self).get_permissions()

    def create(self, request):
        token = self.request.COOKIES.get('jwt')
        data = self.request.data

        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms='HS256')

        user = User.objects.get(pk=payload['id'])
        cpu = MasterCpu.objects.get(name=data['cpu'])
        gpu = MasterGpu.objects.get(name=data['gpu'])
        memory = MasterMemory.objects.get(type=data['memory'])
        company = MasterCompany.objects.get(name=data['company'])
        screen = MasterScreen.objects.get(type=data['screen'])
        sc_res = MasterScreenResolution.objects.get(resolution=data['sc_res'])
        type = MasterTypeLaptop.objects.get(name=data['type']),
        kebutuhan = MasterKebutuhan.objects.get(name=data['kebutuhan'])
        dataset = MasterDataset.objects.create(
            created_by_id=user.id,
            cpu_id=cpu.id,
            gpu_id=gpu.id,
            memory_id=memory.id,
            resolution_id=sc_res.id,
            company_id=company.id,
            screen_id=screen.id,
            type_id=type.id,
            kebutuhan_id= kebutuhan.id
            **data
        )

        serializer = self.get_serializer(dataset)
        return Response(serializer.data)


@api_view(['POST'])
def add_dataset_with_file_view(request):
    token = request.COOKIES.get('jwt')
    file = pd.read_excel(request.FILES.get('file'))

    payload = jwt.decode(
        token, settings.SECRET_KEY, algorithms='HS256')

    user = User.objects.get(pk=payload['id'])
    for index, data in file.iterrows():
        kebutuhan = MasterKebutuhan.objects.get_or_create(name=data[0])
        cpu = MasterCpu.objects.get_or_create(name=data[2])
        gpu = MasterGpu.objects.get_or_create(name=data[3])
        memory = MasterMemory.objects.get_or_create(type=data[5])
        company = MasterCompany.objects.get_or_create(name=data[6])
        screen = MasterScreen.objects.get_or_create(type=data[7])
        resolution = MasterScreenResolution.objects.get_or_create(resolution=data[8])
        type = MasterTypeLaptop.objects.get_or_create(name=data[10])

        MasterDataset.objects.create(
            created_by_id=user.id,
            kebutuhan_id=kebutuhan[0].id,
            cpu_id=cpu[0].id,
            gpu_id=gpu[0].id,
            memory_id=memory[0].id,
            resolution_id=resolution[0].id,
            company_id=company[0].id,
            screen_id=screen[0].id,
            type_id=type[0].id,
            budget=data[1],
            ram=data[4],
            weight=data[9],
            price=data[11],
            name=data[12]
        )

    return Response({"message": "success add dataset"},status=status.HTTP_200_OK)
