from django.db import models
from django.conf import settings
from django.utils import timezone


# 1. General Accounting Features
class Account(models.Model):
    ACCOUNT_TYPES = (
        ('asset', 'Asset'),
        ('liability', 'Liability'),
        ('income', 'Income'),
        ('expense', 'Expense'),
        ('equity', 'Equity'),
    )

    name = models.CharField(max_length=255, unique=True)
    account_type = models.CharField(max_length=50, choices=ACCOUNT_TYPES)
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.account_type})"


# 2. Accounts Payable (AP) and Accounts Receivable (AR)
class Vendor(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.TextField()
    balance_due = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.TextField()
    outstanding_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name


class Invoice(models.Model):
    INVOICE_TYPES = (
        ('payable', 'Accounts Payable'),
        ('receivable', 'Accounts Receivable'),
    )

    date = models.DateField(default=timezone.now)
    invoice_type = models.CharField(max_length=20, choices=INVOICE_TYPES)
    vendor = models.ForeignKey(Vendor, null=True, blank=True, on_delete=models.SET_NULL)
    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    due_date = models.DateField()
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Invoice {self.id} - {self.invoice_type}"


# 3. General Ledger (GL)
class Transaction(models.Model):
    date = models.DateTimeField(default=timezone.now)
    description = models.TextField()
    debit_account = models.ForeignKey(Account, related_name='debits', on_delete=models.CASCADE)
    credit_account = models.ForeignKey(Account, related_name='credits', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"Transaction: {self.debit_account} -> {self.credit_account} | Amount: {self.amount}"


class Ledger(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    debit = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    credit = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Ledger Entry: {self.account} | Debit: {self.debit} | Credit: {self.credit}"


# 4. Fixed Asset Management
class FixedAsset(models.Model):
    name = models.CharField(max_length=255)
    purchase_date = models.DateField()
    purchase_price = models.DecimalField(max_digits=15, decimal_places=2)
    depreciation_rate = models.FloatField(help_text="Percentage rate per year")
    current_value = models.DecimalField(max_digits=15, decimal_places=2)

    def calculate_depreciation(self):
        years = (timezone.now().date() - self.purchase_date).days / 365
        depreciation_amount = self.purchase_price * (self.depreciation_rate / 100) * years
        return self.purchase_price - depreciation_amount

    def save(self, *args, **kwargs):
        self.current_value = self.calculate_depreciation()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# 5. Expense Management
class Expense(models.Model):
    CATEGORY_CHOICES = (
        ('travel', 'Travel'),
        ('utilities', 'Utilities'),
        ('office', 'Office Supplies'),
        ('other', 'Other'),
    )

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField()
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.category} - {self.amount}"


# 6. Budgeting and Forecasting
class Budget(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    month = models.DateField()
    budgeted_amount = models.DecimalField(max_digits=15, decimal_places=2)
    actual_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def variance(self):
        return self.budgeted_amount - self.actual_amount

    def __str__(self):
        return f"Budget for {self.account} - {self.month}"


# 7. Payroll Integration
class Employee(models.Model):
    name = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=15, decimal_places=2)
    tax_percentage = models.FloatField()
    bank_account = models.CharField(max_length=20)

    def calculate_net_salary(self):
        return self.salary - (self.salary * self.tax_percentage / 100)

    def __str__(self):
        return self.name


class Payroll(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    payment_date = models.DateField(default=timezone.now)
    net_salary = models.DecimalField(max_digits=15, decimal_places=2)

    def save(self, *args, **kwargs):
        self.net_salary = self.employee.calculate_net_salary()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payroll for {self.employee} - {self.payment_date}"


# 8. Security and User Management
class Company(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# 9. Audit Logs
class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action} - {self.timestamp}"


# 10. Analytics and Dashboards (Dummy Model for Tracking)
class FinancialMetric(models.Model):
    metric_name = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=15, decimal_places=2)
    date_recorded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.metric_name} - {self.value}"
