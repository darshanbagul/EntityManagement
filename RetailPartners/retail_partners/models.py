from __future__ import unicode_literals

from django.db import models
from authentication.models import Account

# Create your models here.
class RetailPartnerInfo(models.Model):
    id = models.AutoField(primary_key=True)
    contact_name = models.CharField(max_length=50, default=None, null=True)
    business_name = models.CharField(max_length=100, default=None, null=True)
    address_line_1 = models.CharField(max_length=150, default=None)
    address_line_2 = models.CharField(max_length=150, default=None, null=True)
    city = models.CharField(max_length=50, default=None)
    state = models.CharField(max_length=50, default=None)
    country = models.CharField(max_length=50, default=None)
    pin = models.CharField(max_length=10, default=None, null=True)
    contact_number = models.CharField(max_length=20, default=None, null=True)
    location_latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, default=None)
    location_longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, default=None)
    location_string = models.CharField(max_length=300, default=None, null=True)
    strategic_advantage = models.CharField(max_length=500, default=None, null=True)
    retail_location_type = models.CharField(max_length=100, default=None, null=True)
    email = models.CharField(max_length=100, default=None, null=True)
    author = models.ForeignKey(Account)
    updated_by = models.CharField(max_length=100, default=None, null=True)
    status = models.IntegerField(default=3,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    retail_partner_category = models.IntegerField(default=0)
    class Meta:
        managed = True
        db_table = 'retail_partner_info'


class RetailPartnerCategory(models.Model):
    id = models.AutoField(primary_key=True)
    category_id = models.IntegerField()
    category_name = models.CharField(max_length=100)
    status = status = models.IntegerField()
    class Meta:
        managed = True
        db_table = 'retail_partner_category'