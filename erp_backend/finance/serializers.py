# finance/serializers.py
from rest_framework import serializers
from .models import Account, Transaction, Projection

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class ProjectionSerializer(serializers.Serializer):
    months = serializers.IntegerField(min_value=1, max_value=12)
    average_income = serializers.FloatField()
    average_expense = serializers.FloatField()
    projected_income = serializers.ListField(child=serializers.FloatField())
    projected_expense = serializers.ListField(child=serializers.FloatField())