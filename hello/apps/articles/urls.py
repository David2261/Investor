from rest_framework import routers

from .api import IpViewSet, CategoryViewSet, ArticlesViewSet
from .views import HomePage

# Api
router = routers.DefaultRouter()

router.register(r'^ip/$', IpViewSet, 'ip')
router.register(r'^home/$', HomePage, 'home')
router.register(r'^category/$', CategoryViewSet, 'category')
router.register(r'^articles/$', ArticlesViewSet, 'articles')

urlpatterns = router.urls
