from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    # path('', views.index, name="main-view" ),
    path('', HomePage.as_view(), name="home_page"),
    path('about/', AboutPage.as_view(), name="about_page"),
]