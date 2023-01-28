from constance import config
from django.shortcuts import render
from django.views import View


class HomePageView(View):
    def get(self, request, *args, **kwargs):
        context = {
            "datetime_site_goes_live_at": config.DATETIME_SITE_GOES_LIVE_AT,
        }

        return render(request, "app/homepage.html", context)
