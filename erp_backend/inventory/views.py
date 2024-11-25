from rest_framework import viewsets
from .models import Warehouse, Product, Stock, InventoryTransaction
from .serializers import WarehouseSerializer, ProductSerializer, StockSerializer, InventoryTransactionSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    @action(detail=False, methods=['post'])
    def adjust_stock(self, request):
        product_id = request.data.get('product')
        warehouse_id = request.data.get('warehouse')
        quantity = request.data.get('quantity')
        transaction_type = request.data.get('transaction_type')

        product = Product.objects.get(id=product_id)
        warehouse = Warehouse.objects.get(id=warehouse_id)
        stock, created = Stock.objects.get_or_create(product=product, warehouse=warehouse)

        # Adjust stock based on transaction type
        if transaction_type == 'IN':
            stock.quantity += quantity
        elif transaction_type == 'OUT':
            if stock.quantity >= quantity:
                stock.quantity -= quantity
            else:
                return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)

        stock.save()

        # Log the transaction
        InventoryTransaction.objects.create(
            product=product,
            warehouse=warehouse,
            quantity=quantity,
            transaction_type=transaction_type
        )

        return Response({"status": "Stock adjusted successfully"}, status=status.HTTP_200_OK)


class InventoryTransactionViewSet(viewsets.ModelViewSet):
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer
