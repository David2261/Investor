from django.contrib.sitemaps import Sitemap
from .models import Articles


class StaticViewSitemap(Sitemap):
	changefreq = "monthly"
	priority = 0.8

	def items(self):
		return [
			'/', '/about', '/contact', '/responsibility',
			'/payanddelivery', '/confidentiality',
			'/confidentialityandcookies', '/cybersecurity',
			'/agreement', '/termsofuse', '/emailagreement',
			'/news', '/sitemap'
		]

	def location(self, item):
		return item


class ArticlesSitemap(Sitemap):
	changefreq = "weekly"
	priority = 0.9

	def items(self):
		return Articles.objects.filter(is_published=True)

	def lastmod(self, obj):
		return obj.time_update

	def location(self, obj):
		return obj.get_absolute_url()
