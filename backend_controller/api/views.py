from django.shortcuts import render
from django.http import request
from django.contrib.auth import get_user_model
import asyncio
from django.conf import settings
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
from django.conf import settings
from django.views.decorators.csrf import (
    csrf_exempt
)
from rest_framework.views import APIView
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


class Register(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def post(self, request):
        serializers = self.get_serializer(data=request.data)
        valid = serializers.is_valid(raise_exception=True)
        if not valid:
            return Response({"message": "failed to register user"}, status=status.HTTP_400_BAD_REQUEST)
        serializers.create(request.data)
        return Response(serializers.data, status=status.HTTP_201_CREATED)


class RegisterAdminView(generics.GenericAPIView):
    serializer_class = UserSerializers
    def post(self, request):
        serializers = self.get_serializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.admin_create(request.data)
            return Response(serializers.data, status=status.HTTP_201_CREATED)


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
        if user.is_staff == True:
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
        if user.user_type != 'admin':
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


class LogoutUser(APIView):
    def get(self, request):
        res = Response()
        res.delete_cookie('jwt')
        return res


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


class UserCustomerView(generics.GenericAPIView):
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
        verif = User.objects.get(id=payload['id'])
        if verif.user_type != 'admin':
            raise NotAuthenticated()

        if self.kwargs['id']:
            try:
                profile = Profile.objects.get(user_id=id)
                if profile is None:
                    return NotFound()
                serialize = self.get_serializer(profile)
                return Response({"user": serialize.data}, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        profile = Profile.objects.filter(
            user__user_type='customer'
        )
        if profile is None:
            return NotFound()
        serialize = self.get_serializer(profile, many=True)
        return Response({"user": serialize.data}, status=status.HTTP_200_OK)

    def patch(self):
        token = self.request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthorized!")

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except:
            raise AuthenticationFailed('Unauthorized!')
        verif = User.objects.get(id=payload['id'])
        if verif.is_staff != True:
            raise NotAuthenticated("gagal")

        try:
            user_id = self.kwargs['id']
            user = User.objects.get(id=user_id)
            if user is None:
                raise NotFound()
            data = self.request.data
            serialize = self.get_serializer(user, data=data, partial=True)
            if serialize.is_valid():
                serialize.save()
                return Response({"user": serialize.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self):
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
        verif = User.objects.get(id=payload['id'])
        if verif.user_type != 'admin':
            raise NotAuthenticated()

        user_id = self.kwargs['id']
        user = User.objects.get(id=user_id)
        if user is None:
            raise NotFound()
        user.delete()
        return Response(status=status.HTTP_200_OK)


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
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthorized!")
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthorized!')
        except:
            raise AuthenticationFailed('Unauthorized!')

        verif = User.objects.get(id=payload['id'])
        if verif.user_type != 'admin':
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
        data['user'] = verif.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            spek = Dataset.objects.get(pk=serializer.data['id'])
            loop = asyncio.get_event_loop()
            await sync_to_async(self._save_excel_data(file, spek), thread_sensitive=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthorized!")
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthorized!')
        except:
            raise AuthenticationFailed('Unauthorized!')

        verif = User.objects.get(id=payload['id'])
        if verif.user_type != 'admin':
            raise NotAuthenticated()

        try:
            query = self.paginate_queryset(self.queryset)
            serializer = self.get_serializer(query, many=True)
            return self.get_paginated_response(serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SpecificationView(generics.GenericAPIView):
    serializer_class = SpecificationSerializers
    queryset = Specification.objects.all()
    pagination_class = StandardPagination

    def get(self, request, page=1):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthorized!")
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except:
            raise AuthenticationFailed('Unauthorized!')
        verif = User.objects.get(id=payload['id'])
        if verif.user_type != 'admin':
            raise NotAuthenticated()

        try:
            query = self.paginate_queryset(self.queryset)
            serializer = self.get_serializer(query, many=True)
            return self.get_paginated_response(serializer.data)
        except ValueError:
            print(ValueError)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def post(self):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthorized!")
        try:
            jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except:
            raise AuthenticationFailed('Unauthorized!')

        data = request.data
        serializer = self.get_serializer(data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
