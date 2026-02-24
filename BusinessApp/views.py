from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Stock, Sale
from .serializers import ProductSerializer, StockSerializer, SaleSerializer
from django.http import JsonResponse
# Create your views here.
@api_view(['GET'])
def home(request):
     return Response({"massage":"Welcome to inventory management system API","endpoints":{
          "view Product":"/Product/",
          "add_Product":"/add-Product",
          "record_Sale":"/record_Sale" 
           }
           })
@api_view(['GET'])
def Product_list(request):
    Products_data = Product.objects.all()
    
    data=[]
    for p in Products_data:
        data.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
        })

    return JsonResponse(data, safe=False)

@api_view(['POST'])
def add_Product(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            Stock.objects.create(Product=serializer.instance, quantity=0)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['POST'])   
def record_Sale(request):
        product_id = request.data.get('product_id')
        quantity_sold = request.data.get('quantity_sold')

        product=product.objects.get(id=product_id)
        stock = Stock.objects.get(product=product)

        Sale.objects.create(product=product, quantity_sold=quantity_sold, total_price=product.price * quantity_sold)
        stock.quantity -= quantity_sold
        stock.save()

        return Response({'message': 'Sale recorded successfully'}, status=201)

