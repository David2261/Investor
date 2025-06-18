from rest_framework import serializers


class ValidateTitleSlugMixin:
	def validate_title(self, value):
		if len(value) < 5:
			raise serializers.ValidationError(
				"Заголовок должен содержать не менее 5 символов.")
		return value

	def validate_slug(self, value):
		instance = getattr(self, 'instance', None)
		model_class = self.Meta.model

		qs = model_class.objects.filter(slug=value)
		if instance:
			qs = qs.exclude(id=instance.id)
		if qs.exists():
			raise serializers.ValidationError("Слаг должен быть уникальным.")
		return value
