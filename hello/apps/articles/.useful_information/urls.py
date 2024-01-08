from django.urls import path
from django.views.generic import TemplateView, AboutView


app_name = "articles"
urlpatterns = [
    # Самый прямой способ использовать общие представления —
    #             создать их непосредственно в вашем URLconf.
    path('path/', TemplateView.as_view(template_name="some.html")),
    path('about/', AboutView.as_view()),
    # path('articles/<slug:title>/<int:section>/', views.section),
]
