from django.urls import path
from .views import (MarketResearchAPI, KeywordSuggestionAPI, GoogleTrendsAPI,
                    LinkBuildingAPI, ContentOptimizationAPI, SEOReportAPI)

urlpatterns = [
    path('market-research/', MarketResearchAPI.as_view(), name='market-research'),
    path('keyword-suggestions/', KeywordSuggestionAPI.as_view(), name='keyword-suggestions'),
    path('google-trends/', GoogleTrendsAPI.as_view(), name='google-trends'),
    path('link-building/', LinkBuildingAPI.as_view(), name='link-building'),
    path('content-optimization/', ContentOptimizationAPI.as_view(), name='content-optimization'),
    path('seo-reporting/', SEOReportAPI.as_view(), name='seo-reporting'),
]
