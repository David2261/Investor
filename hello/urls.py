from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
	path('', include('leads.urls')),
	path('api/articles/', include('articles.urls')),
	path('api/', include('authentication.urls')),
	path('api/bonds/', include('bonds.urls')),
	path('grappelli/', include('grappelli.urls')),
	path('admin/', admin.site.urls),
	# path('accounts/', include('django.contrib.auth.urls')),
	path('api/v1/auth/', include('djoser.urls')),
	re_path(r'^auth/', include('djoser.urls.authtoken')),
	path('api/v1/allauth/accounts/', include('allauth.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
		+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
