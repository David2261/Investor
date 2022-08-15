from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name="main-view" ),
    path('blog/', BlogView.as_view(), name="blog" ),
    path('articles/<slug:title>/', views.article, name="article-detail" ),
    path('articles/<slug:title>/<slug:section>/', views.section, name="article-section" ),
    path('community/', views.community, name="community" ),
]