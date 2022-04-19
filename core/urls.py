from rest_framework.routers import DefaultRouter

from django.views.generic import TemplateView
from django.db import router
from django.urls import path, include

from . import views

router = DefaultRouter()
router.register('countries',views.CountryView,basename='countries') 
router.register('inflations',views.InflationView,basename='inflations')
router.register('years',views.YearsView,basename='years')

urlpatterns = [ 
    path('',include(router.urls)),  
    
]    