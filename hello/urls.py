from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
	path('', include('leads.urls')),
	path('api/', include('articles.urls')),
	path('api/', include('authentication.urls')),
	path('grappelli/', include('grappelli.urls')),
	path('ckeditor/', include('ckeditor_uploader.urls')),
	path('admin/', admin.site.urls),
	path('accounts/', include('django.contrib.auth.urls')),
	path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
		+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
