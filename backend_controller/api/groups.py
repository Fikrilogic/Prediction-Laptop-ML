import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_controller.settings')

import django

django.setup()
from django.contrib.auth.models import Group


GROUPS = ['admin', 'member']
MODELS = ['User']

for group in GROUPS:
    new_group, created = Group.objects.get_or_create(name=group)