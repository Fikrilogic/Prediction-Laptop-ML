from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, UserManager
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.conf import settings

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
        
        extra_fields.setdefault("user_type", "customer")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        user.password = make_password(password)
        user.save(using=self._db)
        user
        return user
    
    def create_admin(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('User Must Have Email')
        if not username:
            raise ValueError('User Must Have Username')
        if not password:
            raise ValueError("User Must have password")
        
        extra_fields.setdefault("user_type", "admin")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required')
        if not username:
            raise ValueError('Username required')


        extra_fields.setdefault("user_type", "admin")
        extra_fields.setdefault("is_staff", True)

        superuser = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields
        )
        superuser.password = make_password(password)
        superuser.save(using=self._db)
        return superuser


class User(AbstractBaseUser):
    USER_TYPE = (
        ('customer', 'customer'),
        ('admin', 'admin'),
    )

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
    user_type = models.CharField(max_length=40, choices=USER_TYPE)

    created_at = models.DateTimeField(auto_now_add=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_address(self):
        return self.address
