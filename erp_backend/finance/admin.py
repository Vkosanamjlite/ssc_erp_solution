from django.contrib import admin
from .models import (
    Account, Vendor, Customer, Invoice, Transaction, Ledger,
    FixedAsset, Expense, Budget, Employee, Payroll,
    Company, AuditLog, FinancialMetric
)

# General Accounting
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'account_type', 'balance', 'created_at')
    search_fields = ('name', 'account_type')
    list_filter = ('account_type',)

# Accounts Payable and Receivable
@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_info', 'balance_due')
    search_fields = ('name',)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_info', 'outstanding_balance')
    search_fields = ('name',)

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'invoice_type', 'amount', 'due_date', 'is_paid')
    list_filter = ('invoice_type', 'is_paid', 'due_date')
    search_fields = ('vendor__name', 'customer__name')

# General Ledger
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'debit_account', 'credit_account', 'amount', 'date')
    list_filter = ('date',)
    search_fields = ('description', 'debit_account__name', 'credit_account__name')

@admin.register(Ledger)
class LedgerAdmin(admin.ModelAdmin):
    list_display = ('transaction', 'account', 'debit', 'credit', 'date')
    list_filter = ('date', 'account')

# Fixed Asset Management
@admin.register(FixedAsset)
class FixedAssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'purchase_date', 'purchase_price', 'depreciation_rate', 'current_value')
    list_filter = ('purchase_date',)
    search_fields = ('name',)

# Expense Management
@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('category', 'amount', 'description', 'date')
    list_filter = ('category', 'date')
    search_fields = ('category', 'description')

# Budgeting
@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('account', 'month', 'budgeted_amount', 'actual_amount', 'variance')
    list_filter = ('month',)
    search_fields = ('account__name',)

# Payroll Management
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'salary', 'tax_percentage', 'bank_account')
    search_fields = ('name',)

@admin.register(Payroll)
class PayrollAdmin(admin.ModelAdmin):
    list_display = ('employee', 'payment_date', 'net_salary')
    list_filter = ('payment_date',)
    search_fields = ('employee__name',)

# Company Management
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'user__username')

# Audit Logs
@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('user__username', 'action')

# Analytics and Dashboards
@admin.register(FinancialMetric)
class FinancialMetricAdmin(admin.ModelAdmin):
    list_display = ('metric_name', 'value', 'date_recorded')
    list_filter = ('date_recorded',)
    search_fields = ('metric_name',)
