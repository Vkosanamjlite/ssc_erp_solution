from rest_framework import generics, status
from rest_framework.response import Response
from .models import (
    Account, Vendor, Customer, Invoice, Transaction, Ledger,
    FixedAsset, Expense, Budget, Employee, Payroll,
    Company, AuditLog, FinancialMetric
)
from .serializers import (
    AccountSerializer, VendorSerializer, CustomerSerializer, InvoiceSerializer,
    TransactionSerializer, LedgerSerializer, FixedAssetSerializer,
    ExpenseSerializer, BudgetSerializer, EmployeeSerializer, PayrollSerializer,
    CompanySerializer, AuditLogSerializer, FinancialMetricSerializer
)

# 1. General Accounting Views
class AccountListCreateView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


# 2. Accounts Payable and Receivable
class VendorListCreateView(generics.ListCreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class VendorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class InvoiceListCreateView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


# 3. General Ledger Views
class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class LedgerListView(generics.ListAPIView):
    queryset = Ledger.objects.all()
    serializer_class = LedgerSerializer


# 4. Fixed Asset Management Views
class FixedAssetListCreateView(generics.ListCreateAPIView):
    queryset = FixedAsset.objects.all()
    serializer_class = FixedAssetSerializer


class FixedAssetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FixedAsset.objects.all()
    serializer_class = FixedAssetSerializer


# 5. Expense Management Views
class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# 6. Budgeting Views
class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


# 7. Payroll Views
class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class PayrollListCreateView(generics.ListCreateAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer


class PayrollDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer


# 8. Security and User Management
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


# 9. Audit Logs
class AuditLogListView(generics.ListAPIView):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer


# 10. Analytics Views
class FinancialMetricListView(generics.ListCreateAPIView):
    queryset = FinancialMetric.objects.all()
    serializer_class = FinancialMetricSerializer
