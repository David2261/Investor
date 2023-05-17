from rest_framework import routers
from .api import IpViewSet, CategoryViewSet, ArticlesViewSet


# Api
router = routers.DefaultRouter()
router.register(r'ip', IpViewSet, 'ip')
router.register(r'category', CategoryViewSet, 'category')
router.register(r'articles', ArticlesViewSet, 'articles')

urlpatterns = router.urls
