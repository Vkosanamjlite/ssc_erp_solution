# finance/admin.py
from django.contrib import admin
from .models import Account, Transaction, Projection

admin.site.register(Account)
admin.site.register(Transaction)
admin.site.register(Projection)
