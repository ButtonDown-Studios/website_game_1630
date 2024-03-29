from constance import config
from django.shortcuts import render
from django.views import View

from game_1630.app.models import Email
from game_1630.app.utils import send_email_to_recently_signed_up_user, track_event


class HomePageView(View):
    def get(self, request, *args, **kwargs):
        track_event(
            category='1630-Homepage',
            action='page-visited'
        )

        context = {
            "datetime_site_goes_live_at": config.DATETIME_SITE_GOES_LIVE_AT,
            "press_kit_link": config.PRESS_KIT_LINK,
            "press_kit_button_text": config.PRESS_KIT_BUTTON_TEXT,
            "kickstarter_link": config.KICKSTARTER_LINK,
            "facebook_1630_link": config.FACEBOOK_1630_LINK,
            "tiktok_1630_link": config.TIKTOK_1630_LINK,
            "discord_1630_link": config.DISCORD_1630_LINK,
            "instagram_1630_link": config.INSTAGRAM_1630_LINK,
            "youtube_1630_link": config.YOUTUBE_1630_LINK,
            "twitter_1630_link": config.TWITTER_1630_LINK,
        }

        return render(request, "app/homepage.html", context)

    def post(self, request, *args, **kwargs):
        email = request.POST.get("email")
        if email:
            email = Email.objects.create(email=email)
            send_email_to_recently_signed_up_user.delay(email.id)

        context = {
            "datetime_site_goes_live_at": config.DATETIME_SITE_GOES_LIVE_AT,
        }

        return render(request, "app/homepage.html", context)