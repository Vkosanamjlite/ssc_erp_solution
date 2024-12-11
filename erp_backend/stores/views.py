from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ShopifyStore
from .serializers import ShopifyStoreSerializer


class ShopifyStoreListAPI(APIView):
    def get(self, request):
        filters = {
            key: value
            for key, value in request.query_params.items()
            if key in ['name', 'location', 'manager', 'shop_type', 'status'] and value
        }
        stores = ShopifyStore.objects.filter(**filters)
        serializer = ShopifyStoreSerializer(stores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ShopifyStoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShopifyStoreDetailAPI(APIView):
    def get(self, request, pk):
        try:
            store = ShopifyStore.objects.get(pk=pk)
        except ShopifyStore.DoesNotExist:
            return Response({'error': 'Store not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShopifyStoreSerializer(store)
        return Response(serializer.data)
