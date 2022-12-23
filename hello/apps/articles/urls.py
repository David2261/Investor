from django.urls import path
from .views import HomePage, BlogPage, AboutPage

app_name = 'articles'
urlpatterns = [
    # path('', views.index, name="main-view" ),
    path('', HomePage.as_view(), name="home_page"),
    path('articles/', BlogPage.as_view(), name='articles'),
    path('about/', AboutPage.as_view(), name="about_page"),
]