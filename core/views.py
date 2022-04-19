from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import *
from rest_framework.response import Response
from .serializers import *
from .models import *




class BaseModelViewSet(ModelViewSet): 
     
    def get_permissions(self):        
        
        if self.action == 'create':    permission_classes = [IsAdminUser]

        elif self.action == 'update':  permission_classes = [IsAdminUser]

        elif self.action == 'partial_update': permission_classes = [IsAdminUser]

        elif self.action == 'destroy': permission_classes = [IsAdminUser]

        return [permission() for permission in permission_classes]

class CountryView(BaseModelViewSet):
    
    serializer_class   = ContrySerializer
    queryset           = Countries.objects.all()

    def list(self, request):

        queryset   = Countries.objects.all()
        serializer = ContrySerializer(queryset, many=True)
        return Response(serializer.data)

class YearsView(BaseModelViewSet):
    
    serializer_class   = YearSerializer
    queryset           = Years.objects.all()

    def list(self, request):

        queryset   = Years.objects.all()
        serializer = YearSerializer(queryset, many=True)
        return Response(serializer.data)


class InflationView(BaseModelViewSet):
    
    serializer_class   = InflationSerializer
    queryset           = Inflation.objects.all()

    def list(self, request):

        queryset   = Inflation.objects.all()
        serializer = InflationSerializer(queryset, many=True)
        return Response(serializer.data)

