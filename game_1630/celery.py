

from celery import Celery
from celery.signals import setup_logging


app = Celery("1630_game")
app.config_from_object("django.conf:settings", namespace="CELERY")


@setup_logging.connect
def config_loggers(*args, **kwargs):
    from logging.config import dictConfig

    from django.conf import settings

    dictConfig(settings.LOGGING)


app.autodiscover_tasks()
app.conf.beat_schedule = {}