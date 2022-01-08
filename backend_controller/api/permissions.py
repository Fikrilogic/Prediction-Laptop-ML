from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from rest_framework import permissions
from django.conf import settings

import jwt

User = get_user_model()


def is_in_group(user, group_name):

    try:
        return Group.objects.get(name=group_name).user_set.filter(pk=user.id).exists()
    except Group.DoesNotExist:
        return None

def _has_group_permission(user, required_group):
    return any([is_in_group(user, group_name) for group_name in required_group])

class isAdminUser(permissions.BasePermission):
    required_group = ['admin']

    def has_permission(self, request, view):
        token = request.COOKIES.get('jwt')
        if not token:
            return False
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(pk=payload['id'])
            has_group_permission = _has_group_permission(user, self.required_group)
            return token and has_group_permission
        except jwt.ExpiredSignatureError:
            return False
        except:
            return False

    def has_object_permission(self, request, view, obj):
        token = request.COOKIES.get('jwt')
        if not token:
            return False
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(pk=payload['id'])
            has_group_permission = _has_group_permission(user, self.required_group)
            return token and has_group_permission
        except jwt.ExpiredSignatureError:
            return False
        except:
            return False

class isAdminOrMemberUser(permissions.BasePermission):
    required_group = ['admin', 'member']

    def has_permission(self, request, view):
        token = request.COOKIES.get('jwt')
        if not token:
            return False
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(pk=payload['id'])
            has_group_permission = _has_group_permission(user, self.required_group)
            return token and has_group_permission
        except jwt.ExpiredSignatureError:
            return False
        except:
            return False


class isMemberUser(permissions.BasePermission):
    required_group = ['member']

    def has_permission(self, request, view):
        token = request.COOKIES.get('jwt')
        if not token:
            return False
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(pk=payload['id'])
            has_group_permission = _has_group_permission(user, self.required_group)
            return token and has_group_permission
        except jwt.ExpiredSignatureError:
            return False
        except:
            return False

    def has_object_permission(self, request, view, obj):
        token = request.COOKIES.get('jwt')
        if not token:
            return False
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(pk=payload['id'])
            has_group_permission = _has_group_permission(user, self.required_group)
            return token and has_group_permission
        except jwt.ExpiredSignatureError:
            return False
        except:
            return False