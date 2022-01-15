from rest_framework.test import APIRequestFactory, APITestCase, URLPatternsTestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model

from ..models import Profile

User = get_user_model


class LoginTestCase(APITestCase):

    def test_create_user_account(self):
        """
         Test Case for create user account
        """
        data = {
            'username': 'usertest',
            'email': 'user@user.com',
            'password': 'user1234',
            'profile': {
                'first_name': 'user',
                'last_name': 'testing',
                'phone': '081234624621'
            }
        }

        response = self.client.post('/register/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        print(response.status_code)
        self.assertEqual(User.objects.get().username, 'usertest')
        self.assertEqual(Profile.objects.get().user, User.objects.get().id)
        pass

    def test_create_admin_account(self):
        """
         Test Case for create Admin Account
        """

        data = {
            'username': 'admintest',
            'email': 'admin@admin.com',
            'password': 'admin1234',
            'profile': {
                'first_name': '',
                'last_name': '',
                'phone': ''
            }
        }

        response = self.client.post('/staff/register', data, format='json')
        user = User.objects.get(username='admintest')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get().username, 'admintest')
        self.assertIsNone(Profile.objects.get(user=user.id))
