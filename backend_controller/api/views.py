from django.shortcuts import render
from django.http import request
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializers,
    ProfileSerializers,
    DatasetSerializer,
    KebutuhanSerializer
)
from .models import (
    Profile,
    Dataset,
    Kebutuhan
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


class Register(APIView):
    queryset = User.objects.all()

    def post(self, request):
        serializers = UserSerializers(data=request.data)
        valid = serializers.is_valid(raise_exception=True)
        if not valid:
            return Response({"message": "failed to register user"}, status=status.HTTP_400_BAD_REQUEST)
        serializers.create(request.data)
        return Response(serializers.data, status=status.HTTP_201_CREATED)


class RegisterAdminView(APIView):
    def post(self, request):
        serializers = UserSerializers(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.admin_create(request.data)
        return Response(serializers.data, status=status.HTTP_201_CREATED)


class LoginUser(APIView):
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


class LoginAdmin(APIView):
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


class UserView(APIView):
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

        user = UserSerializers().getData(id=payload['id'])
        if user is None:
            return NotFound()
        serialize = UserSerializers(user)

        return Response(serialize.data)


class UserCustomerView(APIView):
    def get(self, request, id=None):
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

        if id:
            try:

                profile = Profile.objects.get(user_id=id)
                if profile is None:
                    return NotFound()
                serialize = ProfileSerializers(profile)
                return Response({"user": serialize.data}, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        profile = Profile.objects.filter(
            user__user_type='customer'
        )
        if profile is None:
            return NotFound()
        serialize = ProfileSerializers(profile, many=True)
        return Response({"user": serialize.data,  "message": "ini pesan"}, status=status.HTTP_200_OK)

    def patch(self, request, id=None):
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
        if verif.is_staff != True:
            raise NotAuthenticated("gagal")
        try:
            user = User.objects.get(id=id)
            if user is None:
                raise NotFound()
            serialize = UserSerializers(user, data=request.data, partial=True)
            if serialize.is_valid():
                serialize.save()
                return Response({"user": serialize.data}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        token = request.COOKIES.get('jwt')

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

        user = User.objects.get(id=id)
        if user is None:
            raise NotFound()
        user.delete()
        return Response(status=status.HTTP_200_OK)

class DatasetView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    @csrf_exempt
    def post(self, request):
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
        data = request.data
        data['user'] = verif.id
        serializer = DatasetSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            dataset = pd.DataFrame(request.FILES)
            print(dataset)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class KebutuhanView(generics.GenericAPIView):
    serializer_class = KebutuhanSerializer
    pagination_class = StandardPagination

    def post(self, request):
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

        data = request.data
        serialize = self.get_serializer(data=data)
        if serialize.is_valid(raise_exception=True):
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)

    def get(self,request):
        queryset = Kebutuhan.objects.all()
        serialize = self.get_serializer(queryset, many=True)
        return Response(serialize.data, status=status.HTTP_200_OK)




