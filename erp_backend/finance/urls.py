from django.urls import path
from .views import (
    AccountListCreateView, AccountDetailView,
    VendorListCreateView, VendorDetailView,
    CustomerListCreateView, CustomerDetailView,
    InvoiceListCreateView, InvoiceDetailView,
    TransactionListCreateView, TransactionDetailView,
    LedgerListView,
    FixedAssetListCreateView, FixedAssetDetailView,
    ExpenseListCreateView, ExpenseDetailView,
    BudgetListCreateView, BudgetDetailView,
    EmployeeListCreateView, EmployeeDetailView,
    PayrollListCreateView, PayrollDetailView,
    CompanyListCreateView, CompanyDetailView,
    AuditLogListView, FinancialMetricListView
)

urlpatterns = [
    # General Accounting
    path('accounts/', AccountListCreateView.as_view(), name='account-list-create'),
    path('accounts/<int:pk>/', AccountDetailView.as_view(), name='account-detail'),

    # Accounts Payable and Receivable
    path('vendors/', VendorListCreateView.as_view(), name='vendor-list-create'),
    path('vendors/<int:pk>/', VendorDetailView.as_view(), name='vendor-detail'),
    path('customers/', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('invoices/', InvoiceListCreateView.as_view(), name='invoice-list-create'),
    path('invoices/<int:pk>/', InvoiceDetailView.as_view(), name='invoice-detail'),

    # General Ledger
    path('transactions/', TransactionListCreateView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', TransactionDetailView.as_view(), name='transaction-detail'),
    path('ledgers/', LedgerListView.as_view(), name='ledger-list'),

    # Fixed Asset Management
    path('fixed-assets/', FixedAssetListCreateView.as_view(), name='fixed-asset-list-create'),
    path('fixed-assets/<int:pk>/', FixedAssetDetailView.as_view(), name='fixed-asset-detail'),

    # Expense Management
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),

    # Budgeting
    path('budgets/', BudgetListCreateView.as_view(), name='budget-list-create'),
    path('budgets/<int:pk>/', BudgetDetailView.as_view(), name='budget-detail'),

    # Payroll
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('payrolls/', PayrollListCreateView.as_view(), name='payroll-list-create'),
    path('payrolls/<int:pk>/', PayrollDetailView.as_view(), name='payroll-detail'),

    # Company Management
    path('companies/', CompanyListCreateView.as_view(), name='company-list-create'),
    path('companies/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),

    # Compliance and Audit Logs
    path('audit-logs/', AuditLogListView.as_view(), name='audit-log-list'),

    # Analytics and Dashboards
    path('metrics/', FinancialMetricListView.as_view(), name='financial-metric-list'),
]
