#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from transliterate import translit


def check_lang(text):
	""" Переводит текст на английский для slug """
	text = translit(text, 'ru', reversed=True)
	return text
