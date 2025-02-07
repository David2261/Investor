import pytest
from django.test import RequestFactory
from articles.models import PageHit
from segregation.decorators import counted


@pytest.mark.django_db
class TestCountedDecorator:
	def setup_method(self):
		self.factory = RequestFactory()

	def test_counted_decorator_increments_count(self):
		request = self.factory.get('/test-url/')

		@counted
		def test_view(request):
			return "Test View"

		response = test_view(request)
		assert response == "Test View"

		page_hit = PageHit.objects.get(url=request.path)
		assert page_hit.count == 1

		response = test_view(request)
		assert response == "Test View"

		page_hit.refresh_from_db()
		assert page_hit.count == 2
