from rest_framework import serializers
from .models import ShopifyStore


class ShopifyStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopifyStore
        fields = '__all__'
