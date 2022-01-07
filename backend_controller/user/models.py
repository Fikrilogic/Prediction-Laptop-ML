from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, Group
from django.utils.translation import gettext_lazy as _

import uuid


# Profile image path function


def get_image_path(self, filename):
    return f'UserImage/{self.pk}/{"profile_image.png"}'


def get_default_image_path():
    return 'UserImage/default/user.png'


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('User Must Have Email')
        if not username:
            raise ValueError('User Must Have Username')
        if not password:
            raise ValueError("User Must have password")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        user.groups = Group.objects.get(pk=1)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('User Must Have Email')
        if not username:
            raise ValueError('User Must Have Username')
        if not password:
            raise ValueError("User Must have password")

        extra_fields.setdefault("is_staff", True)

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        user.password = make_password(password)
        user.groups = Group.objects.get(pk=2)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required')
        if not username:
            raise ValueError('Username required')

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        user.groups = Group.objects.get_or_create(name='admin')
        user.password = make_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    username = models.CharField(
        max_length=60,
        unique=True,
        blank=False,
        null=False
    )
    email = models.CharField(
        max_length=100,
        unique=True,
        blank=False,
        null=False
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    is_staff = models.BooleanField(
        _('is_staff'),
        default=False,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    groups = models.ForeignKey(Group, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'groups_id']

    def __str__(self):
        return self.username

