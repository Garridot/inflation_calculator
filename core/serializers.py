from rest_framework import serializers
from .models import *

class ContrySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Countries
        fields = '__all__'


class InflationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Inflation
        fields = '__all__'

class YearSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Years
        fields = '__all__'



