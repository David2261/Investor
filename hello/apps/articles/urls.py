from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name="main-view" ),
    # User
    path('login/', views.LoginView.as_view(), name="login" ),
    path('logout/', views.LogoutView.as_view(), name="logout" ),
    # Password change
    path('password_change/',
        views.PasswordChangeView.as_view(),
        name="password-change"
    ),
    path('password_change/done/',
        views.PasswordChangeDoneView.as_view(),
        name="password-change-done"
    ),
    # Password Reset
    path('password_reset/',
        views.PasswordResetView.as_view(),
        name="password-reset"
    ),
    path('password_reset/done/',
        views.PasswordResetDoneView.as_view(),
        name="password-reset-done"
    ),
    path('reset/<uidb64>/<token>/',
        views.PasswordResetConfirmView.as_view(),
        name="password-reset-confirm"
    ),
    path('reset/done/',
        views.PasswordResetCompleteView.as_view(),
        name="password-reset-complete"
    ),
    # Articles
    path('blog/', BlogView.as_view(), name="blog"),
    path('articles/<slug:title>/', views.article, name="article-detail"),
    path('articles/<slug:title>/<slug:section>/',
        views.section,
        name="article-section"
    ),
    path('community/', views.community, name="community"),
]