from django.urls import path
from .views import ShopifyStoreListAPI, ShopifyStoreDetailAPI

urlpatterns = [
    path('stores/', ShopifyStoreListAPI.as_view(), name='store-list'),
    path('stores/<int:pk>/', ShopifyStoreDetailAPI.as_view(), name='store-detail'),
]
