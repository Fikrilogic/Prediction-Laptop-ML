from django.utils.deconstruct import deconstructible
import os
import uuid
@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        name = filename.split('.')[0]
        # set filename as random string
        filename = '{}_{}.{}'.format(name, uuid.uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)