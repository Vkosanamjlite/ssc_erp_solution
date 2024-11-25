# finance/views.py
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Account, Transaction, Projection
from .serializers import AccountSerializer, TransactionSerializer, ProjectionSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class ProjectionView(APIView):
    def get_average_monthly_income_expense(self):
        monthly_income = {}
        monthly_expense = {}

        # Group transactions by month and calculate totals for income and expense
        transactions = Transaction.objects.all()
        for transaction in transactions:
            date = transaction.date
            month_year = f"{date.year}-{date.month}"

            if transaction.transaction_type == 'INCOME':
                monthly_income[month_year] = monthly_income.get(month_year, 0) + transaction.amount
            elif transaction.transaction_type == 'EXPENSE':
                monthly_expense[month_year] = monthly_expense.get(month_year, 0) + transaction.amount

        # Calculate average monthly income and expense, with safe division
        average_income = sum(monthly_income.values()) / (len(monthly_income) or 1)
        average_expense = sum(monthly_expense.values()) / (len(monthly_expense) or 1)

        return average_income, average_expense

    def get(self, request, *args, **kwargs):
        # Retrieve the number of months for projection from query params
        try:
            months = int(request.query_params.get('months', 1))
        except ValueError:
            return Response({"error": "Invalid months parameter"}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate average income and expense
        average_income, average_expense = self.get_average_monthly_income_expense()

        # Generate projections for the specified number of months
        projected_income = [average_income] * months
        projected_expense = [average_expense] * months

        # Prepare the response data
        response_data = {
            "months": months,
            "average_income": average_income,
            "average_expense": average_expense,
            "projected_income": projected_income,
            "projected_expense": projected_expense,
        }

        # Instead of validating, we can directly pass the response_data to serializer for representation
        serializer = ProjectionSerializer(response_data)
        return Response(serializer.data, status=status.HTTP_200_OK)
