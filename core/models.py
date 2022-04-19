from django.db import models

# Create your models here.


class Countries(models.Model):
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.country


class Years(models.Model):
    year   = models.CharField(max_length=4)

    def __str__(self):
        return self.year



class Inflation(models.Model):
    country   = models.ForeignKey(Countries,on_delete=models.CASCADE)
    year      = models.ForeignKey(Years,on_delete=models.CASCADE)
    inflation = models.FloatField()
    CPI       = models.FloatField() 

