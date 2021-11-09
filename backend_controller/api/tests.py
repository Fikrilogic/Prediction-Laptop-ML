from django.test import TestCase
from rest_framework import status
from rest_framework.test import (
    APITestCase, APIClient,ForceAuthClientHandler, APIRequestFactory
)

from django.contrib.auth import get_user_model

import json

User = get_user_model()

# Create your tests here.
class UserAccountTest(APITestCase):
    def test_create_user(self):
        url = '/api/register'
        data= {'email': 'a@gmail.com', 'username': 'fikrilogic', 'password': 'lolicon3010'}
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get().username, 'fikrilogic')
    def get_user(self):
        url = '/api/login'
        data = {'email': 'a@gmail.com', 'password': 'lolicon30'}
        res = self.client.get(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_OK)

