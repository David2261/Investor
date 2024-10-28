import pytest
from django.core.paginator import Paginator

from ..pagination import ArticlesPagination


@pytest.mark.django_db
class TestArticlesPagination:

	@pytest.fixture
	def pagination(self):
		return ArticlesPagination()

	def test_get_link(self, pagination):
		paginator = Paginator(range(1, 101), per_page=10)
		pagination.page = paginator.page(1)

		assert pagination.get_link(1) == 1
		assert pagination.get_link(2) == 2
		assert pagination.get_link(11) is None

	def test_get_next_link(self, pagination):
		paginator = Paginator(range(1, 101), per_page=10)
		pagination.page = paginator.page(1)
		assert pagination.get_next_link() == 2

		pagination.page = paginator.page(10)
		assert pagination.get_next_link() is None

	def test_get_previous_link(self, pagination):
		paginator = Paginator(range(1, 101), per_page=10)
		pagination.page = paginator.page(2)

		assert pagination.get_previous_link() == 1

		pagination.page = paginator.page(1)
		assert pagination.get_previous_link() is None

	def test_get_total_pages(self, pagination):
		paginator = Paginator(range(1, 101), per_page=10)
		pagination.page = paginator.page(1)

		assert pagination.get_total_pages() == 10

	def test_get_paginated_response(self, pagination):
		paginator = Paginator(range(1, 101), per_page=10)
		pagination.page = paginator.page(1)

		response_data = pagination.get_paginated_response(
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

		assert response_data.data['results'] == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		assert response_data.data['count'] == 100
		assert response_data.data['next'] == 2
		assert response_data.data['previous'] is None
		assert response_data.data['total_pages'] == 10
