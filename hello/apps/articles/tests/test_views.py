from requests import head, get
from django.test import TestCase

# Показывает статус главной страницы
response = head('http://127.0.0.1:8000/')
print(response.status_code)

# Основной домен сайта, т.к. это тест, то используется локальный сервер
# 		http://127.0.0.1:8000/
# Иначе основной инвстиционный сайт
# 		https://investingblog.herokuapp.com
DOMAIN = 'https://investingblog.herokuapp.com'

#
PAGES = (
	'',
	'home/',
	'home/idea/',
	'home/learn/',
	'home/motiv',
	'help/',
	'setting/',
	'404/',
)

PAGES = (DOMAIN + pages for pages in PAGES)


class PagesTests(TestCase):

	def test_status_page(self):
		# В тесте на каждую страницу мы
		# отправляем HEAD-запрос и сохраняем ответ в переменной response.
		for page in PAGES:
			with self.subTest(f'{page=}'):
				response = head(page) # 1
				# После этого проверяем, равен ли статус-код страницы 200.
				self.assertEqual(response.status_code, 200) # 2 & 3