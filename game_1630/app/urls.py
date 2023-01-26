from django.urls import path

from game_1630.app.views import HomePageView

urlpatterns = [
    path("", HomePageView.as_view(), name="category_list"),
]
