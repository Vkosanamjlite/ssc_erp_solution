from rest_framework.views import APIView
from rest_framework.response import Response
from .models import MarketResearch, KeywordSuggestion, GoogleTrendsData, LinkBuilding, ContentOptimization, SEOReport
from .serializers import (MarketResearchSerializer, KeywordSuggestionSerializer, GoogleTrendsDataSerializer,
                          LinkBuildingSerializer, ContentOptimizationSerializer, SEOReportSerializer)


class MarketResearchAPI(APIView):
    def get(self, request):
        research = MarketResearch.objects.all()
        serializer = MarketResearchSerializer(research, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MarketResearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class KeywordSuggestionAPI(APIView):
    def get(self, request):
        suggestions = KeywordSuggestion.objects.all()
        serializer = KeywordSuggestionSerializer(suggestions, many=True)
        return Response(serializer.data)


class GoogleTrendsAPI(APIView):
    def get(self, request):
        trends = GoogleTrendsData.objects.all()
        serializer = GoogleTrendsDataSerializer(trends, many=True)
        return Response(serializer.data)


class LinkBuildingAPI(APIView):
    def get(self, request):
        links = LinkBuilding.objects.all()
        serializer = LinkBuildingSerializer(links, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LinkBuildingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContentOptimizationAPI(APIView):
    def get(self, request):
        content = ContentOptimization.objects.all()
        serializer = ContentOptimizationSerializer(content, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContentOptimizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SEOReportAPI(APIView):
    def get(self, request):
        reports = SEOReport.objects.all()
        serializer = SEOReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SEOReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
