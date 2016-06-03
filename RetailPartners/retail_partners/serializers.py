from rest_framework import serializers

from authentication.serializers import AccountSerializer
from models import RetailPartnerInfo


class RetailPartnerSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    class Meta:
        model = RetailPartnerInfo

        fields = ('id', 'author','contact_name', 'business_name', 'address_line_1', 'address_line_2','city', 'state', 'country','pin', 'location_latitude', 'location_longitude', 'contact_number', 'email', 'created_at','updated_at','updated_by','strategic_advantage','retail_location_type','status', 'location_string', 'retail_partner_category')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(RetailPartnerSerializer, self).get_validation_exclusions()

        return exclusions + ['author']