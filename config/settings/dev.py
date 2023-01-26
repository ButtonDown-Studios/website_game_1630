import os

from game_1630.core.env_utils import get_env_variable

from .base import *  # noqa


DEBUG = True

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")  # noqa

MEDIA_URL = "/django-media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # noqa
