from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ArticlesPagination(PageNumberPagination):
	page_size_query_param = 'page_size'
	max_limit = 100

	def get_link(self, page_number):
		if page_number > self.page.paginator.num_pages:
			return None
		return page_number

	def get_next_link(self):
		if not self.page.has_next():
			return None
		return self.get_link(self.page.next_page_number())

	def get_previous_link(self):
		if not self.page.has_previous():
			return None
		return self.get_link(self.page.previous_page_number())

	def get_total_pages(self):
		return self.page.paginator.num_pages

	def get_paginated_response(self, data):
		return Response({
			'results': data,
			'count': self.page.paginator.count,
			'next': self.get_next_link(),
			'previous': self.get_previous_link(),
			'total_pages': self.get_total_pages()
		})
