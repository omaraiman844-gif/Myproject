from django.db import models

# Create your models here.
class Product(models.Model):
        name = models.CharField(max_length=100)
        description = models.TextField(blank=True,null=True)
        price = models.DecimalField(max_digits=10, decimal_places=2)

        def __str__(self):
                return self.name


class Stock(models.Model):
        product = models.OneToOneField(Product, on_delete=models.CASCADE)
        quantity = models.IntegerField()

        def __str__(self):
                return f"{self.Product.name} - {self.quantity}"


class Sale(models.Model):
        Product = models.ForeignKey(Product, on_delete=models.CASCADE)
        quantity_sold = models.IntegerField()
        total_price = models.DecimalField(max_digits=10, decimal_places=2)
        sale_date = models.DateTimeField(auto_now_add=True)

        def __str__(self):
                return self.Product.name

