from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
	path('', include('articles.urls')), # Узел для пост - страниц
    path('', include('chat.urls')), # Узел для страницы контактной формы
    path('', include('leads.urls')),
	path('grappelli/', include('grappelli.urls')),
    path('tinymce/', include('tinymce.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
              + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
