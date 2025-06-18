from rest_framework import serializers


class ClientMetricsSerializer(serializers.Serializer):
	userId = serializers.CharField()
	visitTime = serializers.DateTimeField()
	ipAddress = serializers.CharField()
	userAgent = serializers.CharField()
	timeZone = serializers.CharField()
	deviceInfo = serializers.JSONField()
	connectionInfo = serializers.JSONField()
