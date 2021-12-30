from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import Profile


class ProfileTestCase(TestCase):

    def setUp(self):
        user = get_user_model().objects.create_user(email='fikrisandi@gmail.com', username='fikrilogic',
                                                    password='30303030')
        Profile.objects.create(user=user, first_name='Fikri', last_name='Harya Sandi', phone='081222222222')

    def test_profile_user_created(self):
        user = get_user_model().objects.get(username='fikrilogic')
        profile = Profile.objects.get(first_name='Fikri')
        self.assertEqual(profile.user, user)
        self.assertLessEqual(len(profile.phone), 13)

    def test_edit_profile(self):
        profile = Profile.objects.get(first_name='Fikri')
        profile.phone = '081234624621'
        profile.first_name = 'fikri'
        profile.last_name = 'harya sandi'
        profile.save()
        self.assertEqual(profile.phone, '081234624621')
        self.assertLessEqual(len(profile.phone), 13)
        self.assertEquals(profile.first_name, 'fikri')
        self.assertEquals(profile.last_name, 'harya sandi')

    def delete_user(self):
        user_id = get_user_model().objects.get(username='fikrilogic')
        get_user_model().objects.get(username='fikrilogic').delete()
        profile = Profile.objects.get(user=user_id)
        self.assertIsNone(profile, msg='user is deleted')
