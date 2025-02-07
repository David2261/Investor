from django.apps import apps


def get_custom_apps(django_apps):
	""" Возвращает список приложений. """
	app_list = []
	for app in apps.get_app_configs():
		if app.name not in django_apps:
			app_list.append({
				'name': app.name,
				'label': app.label,
				'verbose_name': app.verbose_name,
			})
	return app_list


def get_models_info(apps_list):
	""" Возвращает список моделей внутри приложения. """
	app_models = {}
	for app_name in apps_list:
		try:
			app_config = apps.get_app_config(app_name)
			models = app_config.get_models()
			model_info = {}
			for model in models:
				model_info[model.__name__] = [
						field.name for field in model._meta.get_fields()]
			app_models[app_name] = model_info
		except LookupError:
			app_models[app_name] = {}
	return app_models
