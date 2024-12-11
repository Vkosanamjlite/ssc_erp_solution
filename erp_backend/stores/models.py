from django.db import models


class ShopifyStore(models.Model):
    SHOP_TYPES = [
        ('Retail', 'Retail'),
        ('Wholesale', 'Wholesale'),
    ]

    SHOP_STATUSES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Under Review', 'Under Review'),
    ]

    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    manager = models.CharField(max_length=255)
    shop_type = models.CharField(max_length=50, choices=SHOP_TYPES)
    status = models.CharField(max_length=50, choices=SHOP_STATUSES, default='Active')
    api_key = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)

    def __str__(self):
        return self.name
