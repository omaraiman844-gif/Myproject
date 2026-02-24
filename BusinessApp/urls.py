from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('Product/', views.Product_list, name='Product-list'),
    path('Product/add/', views.add_Product, name='add-Product'),
    path('Sale/record/', views.record_Sale, name='record-Sale'),
]