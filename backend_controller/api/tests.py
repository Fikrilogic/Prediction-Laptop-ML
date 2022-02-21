from django.test import TestCase
from rest_framework import status
from rest_framework.test import (
    APITestCase, APIClient,ForceAuthClientHandler, APIRequestFactory, force_authenticate
)
from faker import Faker

from django.contrib.auth import get_user_model

import json

User = get_user_model()
faker = Faker()
data = {'email':faker.email(), 'username': faker.name(), 'password': faker.name()}
# Create your tests here.
class UserAccountTest(APITestCase):


    def test_create_admin(self):
        url = '/api/staff/register'
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get().username, data['username'])
    def test_get_user(self):
        url = '/api/staff/login'
        user = {'email': data['email'], 'password': data['password']}
        res = self.client.post(url, user, format='json')
        print(res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

class LaptopTest(APITestCase):
    company = {"name": "Acer"}
    user = User

    def test_create_company(self):
        url = '/api/company/'
        res = self.client.post(url, self.company, format="json")

        print(res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.name, "Acer")
        self.assertIsInstance(res.data.id, str)

