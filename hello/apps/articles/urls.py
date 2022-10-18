from django.urls import path
from .views import HomePage, ArticlesList, AboutPage

app_name = 'articles'
urlpatterns = [
    # path('', views.index, name="main-view" ),
    path('', HomePage.as_view(), name="home_page"),
    path('articles/', ArticlesList.as_view(), name='articles'),
    path('about/', AboutPage.as_view(), name="about_page"),
]