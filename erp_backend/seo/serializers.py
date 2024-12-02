from rest_framework import serializers
from .models import MarketResearch, KeywordSuggestion, GoogleTrendsData, LinkBuilding, ContentOptimization, SEOReport


class MarketResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketResearch
        fields = '__all__'


class KeywordSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeywordSuggestion
        fields = '__all__'


class GoogleTrendsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleTrendsData
        fields = '__all__'


class LinkBuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkBuilding
        fields = '__all__'


class ContentOptimizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentOptimization
        fields = '__all__'


class SEOReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOReport
        fields = '__all__'
