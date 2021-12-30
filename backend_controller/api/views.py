from django.shortcuts import render
from django.http import request
from django.contrib.auth import get_user_model
import asyncio
from asgiref.sync import sync_to_async
from .serializers import (
    UserSerializers,
    ProfileSerializers,
    DatasetSerializer,
    SpecificationSerializers
)
from .models import (
    Profile,
    Dataset,
    Specification
)
from .pagination import StandardPagination
from .middleware import AuthenticationJwt

from django.conf import settings
from django.views.decorators.csrf import (
    csrf_exempt
)
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import (
    AuthenticationFailed,
    PermissionDenied,
    NotAcceptable,
    NotAuthenticated,
    NotFound,
)
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

import jwt
import datetime
import pandas as pd

User = get_user_model()


# Create your views here.

# Register Member
class Register(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def post(self, request):
        data = self.request.data
        serializers = self.get_serializer(data=data)
        if serializers.is_valid(raise_exception=True):
            serializers.create()
            return Response(serializers.data, status=status.HTTP_201_CREATED)


# Register Admin
class RegisterAdminView(generics.GenericAPIView):
    serializer_class = UserSerializers

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

        email = self.request.data['email']
        password = self.request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("password failed")
        if user.is_staff:
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
        email = self.request.data['email']
        password = self.request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise AuthenticationFailed("password failed")
        if not user.is_staff:
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
    def get(self):
        res = Response()
        res.delete_cookie('jwt')
        return res


# get profile user
class UserView(generics.GenericAPIView):
    serializer_class = UserSerializers

    def get(self):
        token = self.request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthorized!")
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthorized!')
        except:
            raise AuthenticationFailed('Unauthorized!')

        id = payload['id']
        user = User.objects.filter(id=id)
        if user is None:
            return NotFound()
        serialize = self.get_serializer(user)
        return Response(serialize.data)


# User Customer Data view
class UserCustomerView(generics.GenericAPIView):
    serializer_class = ProfileSerializers

    def get(self):
        status = AuthenticationJwt.get_admin_authentication(self.request)
        if status is None:
            raise NotAuthenticated()

        if self.kwargs['id']:
            try:
                profile = Profile.objects.get(user_id=self.kwargs['id'])
                if profile is None:
                    return NotFound()
                serialize = self.get_serializer(profile)
                return Response({"user": serialize.data}, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        profile = Profile.objects.filter(
            user__is_staff=False
        )
        if profile is None:
            return NotFound()
        serialize = self.get_serializer(profile, many=True)
        return Response({"user": serialize.data}, status=status.HTTP_200_OK)

    def patch(self):
        status = AuthenticationJwt.get_admin_authentication(self.request)
        if status is None:
            raise NotAuthenticated()

        try:
            user_id = self.kwargs['id']
            profile = Profile.objects.get(user_id=user_id)
            if profile is None:
                raise NotFound()
            data = self.request.data
            serialize = self.get_serializer(profile, data=data, partial=True)
            if serialize.is_valid(raise_exception=True):
                serialize.save()
                return Response({"user": serialize.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self):
        status = AuthenticationJwt.get_admin_authentication(self.request)
        if status is None:
            raise NotAuthenticated()

        user_id = self.kwargs['id']
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user_id=user_id)
        if user is None and profile is None:
            raise NotFound()
        user.delete()
        profile.delete()
        return Response(status=status.HTTP_200_OK)

# FOR CRUD Dataset File
class DatasetView(generics.GenericAPIView):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = DatasetSerializer
    queryset = Dataset.objects.all()

    # function for save data from excel to database
    def _save_excel_data(self, excel, dataset_id):
        for data in excel.itertuples():
            data_obj = Specification.objects.create(
                dataset=dataset_id,
                budget=data.budget,
                cpu=data.cpu,
                gpu=data.gpu,
                ram=data.ram,
                memory_type=data.memory_type,
                company=data.company,
                screen_type=data.screen_type,
                screen_resolution=data.screen_resolution,
                weight=data.weight,
                type_laptop=data.type_laptop,
                kebutuhan=data.kebutuhan
            )
            data_obj.save()

    @csrf_exempt
    async def post(self, request):
        status = AuthenticationJwt.get_admin_authentication(request)
        if status is None:
            raise NotAuthenticated()

        file = pd.read_excel(request.FILES['path'].read())
        columns_name = [f.name for f in Specification._meta.get_fields()]
        for col in file.columns:
            if columns_name.count(col) > 1:
                continue
            else:
                break
                return Response({"message": "DATA IS REJECTED"}, status.HTTP_403_FORBIDDEN)

        data = request.data
        data['user'] = status.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            dataset = Dataset.objects.get(pk=serializer.data['id'])
            self._save_excel_data(file, dataset)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self):
        status = AuthenticationJwt.get_admin_authentication(self.request)
        if status is None:
            raise NotAuthenticated()

        try:
            query = self.paginate_queryset(self.queryset)
            serializer = self.get_serializer(query, many=True)
            return self.get_paginated_response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self):
        status = AuthenticationJwt.get_admin_authentication(self.request)
        if status is None:
            raise NotAuthenticated()

        if self.kwargs['id']:
            try:
                id = self.kwargs['id']
                query = Dataset.objects.filter(id=id).delete()
                if query is None:
                    raise NotFound()
                return Response({"message": "File is Deleted"}, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            query = self.get_queryset()
            query.delete()
            return Response({"message": "All File is Deleted"}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# FOR Dataset Table Specification
class SpecificationView(generics.GenericAPIView):
    serializer_class = SpecificationSerializers
    queryset = Specification.objects.all()
    pagination_class = StandardPagination

    def get(self):
        status = AuthenticationJwt.get_admin_authentication(self.request)
        if status is None:
            raise NotAuthenticated()

        try:
            query = self.paginate_queryset(self.queryset)
            serializer = self.get_serializer(query, many=True)
            return self.get_paginated_response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def post(self, request):
        status = AuthenticationJwt.get_user_authentication()
        if status is None:
            raise NotAuthenticated()

        data = request.data
        serializer = self.get_serializer(data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self):
        status = AuthenticationJwt.get_admin_authentication()
        if status is None:
            raise NotAuthenticated()

        if self.kwargs['id']:
            try:
                id = self.kwargs['id']
                query = Specification.objects.filter(id=id).delete()
                if query is None:
                    raise NotFound()
                return Response({"message": "Data Deleted"}, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            query = self.get_queryset()
            query.delete()
            return Response({"message": "All File is Deleted"}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
