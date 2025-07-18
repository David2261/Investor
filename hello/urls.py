from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
	path('api/articles/', include('articles.urls')),
	path('api/', include('authentication.urls')),
	path('api/bonds/', include('bonds.urls')),
	path('api/admin/', include('adminpanel.urls')),
	path('admin/', admin.site.urls),
	# path('accounts/', include('django.contrib.auth.urls')),
	path('api/v1/auth/', include('djoser.urls')),
	path('api/v1/auth/', include('djoser.urls.jwt')),
	path('api/v1/allauth/accounts/', include('allauth.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
		+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
