import logging
import requests
import os

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from game_1630.celery import app
from game_1630.app.models import Email

logger = logging.getLogger(__name__)


@app.task
def send_email_to_recently_signed_up_user(email_object_id):
    email = Email.objects.get(id=email_object_id)

    send_mail(
        subject=" Welcome to 1630: The Thirty Years’ War",
        message="Thanks for subscribing.",
        html_message=render_to_string("app/email_newsletter.html"),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email.email],
    )



# Environment variables are defined in app.yaml.
GA_TRACKING_ID = "G-32VDW9VNLG"


def track_event(category, action, label=None, value=0):
    data = {
        'v': '1',  # API Version.
        'tid': GA_TRACKING_ID,  # Tracking ID / Property ID.
        # Anonymous Client Identifier. Ideally, this should be a UUID that
        # is associated with particular user, device, or browser instance.
        'cid': '555',
        't': 'event',  # Event hit type.
        'ec': category,  # Event category.
        'ea': action,  # Event action.
        'el': label,  # Event label.
        'ev': value,  # Event value, must be an integer
        'ua': 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14'
    }

    response = requests.post(
        'https://www.google-analytics.com/collect', data=data)

    # If the request fails, this will raise a RequestException. Depending
    # on your application's needs, this may be a non-error and can be caught
    # by the caller.
    response.raise_for_status()
