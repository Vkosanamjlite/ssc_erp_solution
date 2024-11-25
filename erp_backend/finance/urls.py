# finance/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, TransactionViewSet, ProjectionView

router = DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'transactions', TransactionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('projection/', ProjectionView.as_view(), name='projection')  # Add ProjectionView as a separate path
]
