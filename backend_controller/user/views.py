from django.shortcuts import render
from django.http import HttpResponseBadRequest
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import NewUser

# Create your views here.
