from rest_framework import permissions
from rest_framework.generics import ListAPIView
from articles.models import Articles


class BaseArticleList(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Articles.objects.filter(
        is_published=True).select_related(
            'category').prefetch_related('author')
