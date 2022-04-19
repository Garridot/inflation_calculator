from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseBadRequest
from core.models import *
import json


# Create your views here.


    



class MainView(TemplateView):
    template_name = 'Main.html'

    def post(self, request):
        data = json.load(request)['content'] 

        
        year1  = Years.objects.get(year=data['start_year'])
        year2  =  Years.objects.get(year=data['end_year'])

        CPI1   = Inflation.objects.get(country=1,year=year1).CPI 
        CPI2   = Inflation.objects.get(country=1,year=year2).CPI 
        
        amount = float(data['amount'])

        cumulative_inflation = ( (CPI2 - CPI1) /CPI1) *100         


        new_amount = round(amount * (CPI2/CPI1),2)

        res = {
            'year1':year1.year,
            'year2':year2.year,
            'CPI1': round(CPI1,2), 
            'CPI2': round(CPI2,2),
            'amount':amount , 
            'new_amount':new_amount,
            'cumulative_inflation': round(cumulative_inflation,2) 
            }
        
        return HttpResponse(json.dumps(res), content_type="application/json")





    
   
