from django.contrib import admin
from .models import *
# Register your models here.

class CountryAdmin(admin.ModelAdmin): list_display = ('id','country',)

class YearAdmin(admin.ModelAdmin): list_display = ('id','year',)

class InflationAdmin(admin.ModelAdmin): list_display = ('id','country','year','inflation','CPI')   


admin.site.register(Countries,CountryAdmin)
admin.site.register(Years,YearAdmin)
admin.site.register(Inflation,InflationAdmin)
