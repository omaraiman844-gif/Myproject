from django.contrib import admin
from .models import Product, Stock, Sale

# Register your models here.
admin.site.register(Product)
admin.site.register(Stock)
admin.site.register(Sale)