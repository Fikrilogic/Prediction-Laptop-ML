from django.utils.deprecation import MiddlewareMixin
from rest_framework.exceptions import (
    AuthenticationFailed,
    PermissionDenied,
    NotAcceptable,
    NotAuthenticated,
    NotFound,
)
from django.conf import settings
from django.contrib.auth import get_user_model

import jwt

User = get_user_model()


class AuthenticationJwt(MiddlewareMixin):
    """
     Middleware for JWT Authentication
    """

    def process_request(self, request):
        pass

    def get_user_authentication(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise PermissionDenied()

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
        except jwt.ExpiredSignatureError:
            return None
        except:
            return None
        user = User.objects.get(id=payload['id'])
        return user

    @staticmethod
    def get_admin_authentication(request):
        user = AuthenticationJwt.get_user_authentication(request)
        return user if user.is_staff else None

    @staticmethod
    def get_user_authentication(request):
        return AuthenticationJwt.get_user_authentication(request)