#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from transliterate import translit
from transliterate import get_available_language_codes


def check_lang(text: str) -> str:
	""" Переводит текст на английский для slug """
	if not isinstance(text, str):
		raise ValueError("Input must be a string")

	# Проверяем, доступен ли язык 'ru' для транслитерации
	if 'ru' not in get_available_language_codes():
		raise ValueError(
			"Russian language is not supported "
			"by the transliteration library")

	try:
		# Переводим текст на английский
		return translit(text, 'ru', reversed=True)
	except Exception as e:
		print(f"Caught an exception: {e}")
		raise ValueError(f"Error during transliteration: {e}")
