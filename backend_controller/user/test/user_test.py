from django.test import TestCase
from ..models import User


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(email='fikrisandi@gmail.com', username='fikrilogic', password='30303030')
        User.objects.create_admin(email='admin@admin.com', username='admin', password='admin123')

    def test_user_created(self):
        user_added = User.objects.get(username='fikrilogic')
        user_test = User.objects.get(email='fikrisandi@gmail.com')
        self.assertEqual(user_test, user_added, msg='user objects is equals')
        self.assertEqual(user_test.email, user_added.email, msg='User email is a equals ')
        self.assertEqual(user_test.check_password('30303030'), True)

    def test_admin_created(self):
        admin_added = User.objects.get(username='admin')
        admin_test = User.objects.get(email='admin@admin.com')
        self.assertEqual(admin_test, admin_added)
        self.assertEqual(admin_test.email, admin_added.email)
        self.assertEqual(admin_test.check_password('admin123'), True)

    def test_user_staff_status(self):
        user = User.objects.get(username='fikrilogic')
        admin = User.objects.get(username='admin')
        self.assertEqual(user.is_staff, False, msg='User Registered as Not Staff')
        self.assertEqual(admin.is_staff, True, msg='admin Registered as Staff')
