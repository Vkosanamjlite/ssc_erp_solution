from rest_framework import serializers
from .models import (
    Account, Vendor, Customer, Invoice, Transaction, Ledger,
    FixedAsset, Expense, Budget, Employee, Payroll,
    Company, AuditLog, FinancialMetric
)

# General Accounting Serializers
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


# Accounts Payable (AP) and Accounts Receivable (AR)
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    vendor = VendorSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'


# General Ledger (GL)
class TransactionSerializer(serializers.ModelSerializer):
    debit_account = AccountSerializer(read_only=True)
    credit_account = AccountSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = '__all__'


class LedgerSerializer(serializers.ModelSerializer):
    transaction = TransactionSerializer(read_only=True)
    account = AccountSerializer(read_only=True)

    class Meta:
        model = Ledger
        fields = '__all__'


# Fixed Asset Management
class FixedAssetSerializer(serializers.ModelSerializer):
    current_value = serializers.DecimalField(
        max_digits=15, decimal_places=2, read_only=True
    )

    class Meta:
        model = FixedAsset
        fields = '__all__'


# Expense Management
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


# Budgeting and Forecasting
class BudgetSerializer(serializers.ModelSerializer):
    variance = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ['id', 'account', 'month', 'budgeted_amount', 'actual_amount', 'variance']

    def get_variance(self, obj):
        return obj.variance()


# Payroll Integration
class EmployeeSerializer(serializers.ModelSerializer):
    net_salary = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'name', 'salary', 'tax_percentage', 'bank_account', 'net_salary']

    def get_net_salary(self, obj):
        return obj.calculate_net_salary()


class PayrollSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = Payroll
        fields = '__all__'


# Security and User Management
class CompanySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Company
        fields = '__all__'


# Compliance and Audit Features
class AuditLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = AuditLog
        fields = '__all__'


# Analytics and Dashboards
class FinancialMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialMetric
        fields = '__all__'
