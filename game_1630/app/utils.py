import logging

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
        subject="1630 - The Thirty Years War Newsletter Confirmation",
        message="Thanks for subscribing.",
        html_message=render_to_string("app/email_newsletter.html"),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email.email],
    )


