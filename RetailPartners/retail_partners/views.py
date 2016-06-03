from rest_framework import permissions, viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from models import RetailPartnerInfo
from permissions import IsAuthorOfRP
from serializers import RetailPartnerSerializer
import json
from utils import map_retail_partner_images
from pymongo import MongoClient
import mandrill
from config import SENDER_EMAIL, MANDRILL_API_KEY

class RetailPartnerViewSet(viewsets.ModelViewSet):
    queryset = RetailPartnerInfo.objects.all()
    serializer_class = RetailPartnerSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfRP(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)
        if self.request.data.get('files'):
            map_retail_partner_images(self.request.data['files'], instance.id)
        return super(RetailPartnerViewSet, self).perform_create(serializer)



class AccountRetailPartnersViewSet(viewsets.ViewSet):
    queryset = RetailPartnerInfo.objects.select_related('author').all()
    serializer_class = RetailPartnerSerializer
    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

def get_rp_profile(request):
    rp_id = request.GET['id']
    retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
    serialized = RetailPartnerSerializer(retail_partner)
    client = MongoClient()
    db = client['retail_partners']
    coll = db['rp_images']
    response_dict = json.loads(json.dumps(serialized.data))
    rp_doc = coll.find_one({'rp_id': int(rp_id)})
    try:
        existing_images = rp_doc['images']
        response_dict['images'] = existing_images
    except Exception as e:
        print str(e)
    return HttpResponse(json.dumps(response_dict))

def get_city_profile(request):
    city_name = request.GET['city']
    retail_partner = RetailPartnerInfo.objects.filter(city=city_name)
    serializer_class = RetailPartnerSerializer
    serializer = serializer_class(retail_partner, many=True)
    return HttpResponse(json.dumps(serializer.data))

def update_rp_data(request):
    rp_data = json.loads(request.body)
    print rp_data
    try:    
        rp_data.pop('author')
        map_retail_partner_images(rp_data['files'], rp_data['id'])
        rp_data.pop('images')
    except Exception as e:
        print str(e)
    try:
        rp_data.pop('files')
    except Exception as e:
        print str(e)
    rp_obj = RetailPartnerInfo.objects.filter(id=rp_data['id']).update(**rp_data)
    return HttpResponse('Updated Rp Data')

def deactivate_retail_partner(request):
    data = json.loads(request.body)
    rp_list = data['deactivate_list']
    for rp_id in rp_list:
        retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
        retail_partner.status = 5
        retail_partner.save()
    return HttpResponse('Deactivation Request Successful!')

def deactivate_retail_partner_admin(request):
    rp_id = request.GET['id']
    retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
    retail_partner.status = 3
    retail_partner.save()
    return HttpResponse('Deactivation Successful!')

def reactivate_retail_partner(request):
    rp_id = request.GET['id']
    retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
    retail_partner.status = 6
    retail_partner.save()
    return HttpResponse('Successfully Reactivated!')

def reactivate_retail_partner_admin(request):
    rp_id = request.GET['id']
    retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
    retail_partner.status = 2
    retail_partner.save()
    return HttpResponse('Successfully Reactivated!')


def validate_rp_data(request):
    rp_id = request.GET['id']
    retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
    retail_partner.status = 2
    retail_partner.save()
    return HttpResponse('Successfully Validated!')

def send_for_review(request):
    rp_id = request.GET['id']
    retail_partner = RetailPartnerInfo.objects.get(id=rp_id)
    retail_partner.status = 4
    retail_partner.save()
    return HttpResponse('Successfully Sent for Review!')

def app_retail_partners(request):
    retail_partners = RetailPartnerInfo.objects.filter(status=2)
    response = []
    for rp in retail_partners:
        rp_obj = {
            "Contact Name": rp.contact_name,
            "Business Name": rp.business_name,
            "Address": rp.address_line_1,
            "City": rp.city,
            "State": rp.state,
            "Country": rp.country,
            "Pin Code": rp.pin,
            "Contact": rp.contact_number,
            "Location Latitude": str(rp.location_latitude),
            "Location Longitude": str(rp.location_longitude),
            "Location String": rp.location_string,
            "Email": rp.email,
            "Website": "",
            "S no": str(rp.id),
            "location_type": rp.retail_location_type,
            "rp_category" : rp.retail_partner_category
        }
        response.append(rp_obj)
    return HttpResponse(json.dumps(response))

def fetch_data_for_validation(request):
    retail_partners = RetailPartnerInfo.objects.all()
    serializer_class = RetailPartnerSerializer
    serializer = serializer_class(retail_partners, many=True)
    return HttpResponse(json.dumps(serializer.data))

def send_mail(request):
    try:
        data = json.loads(request.body)
        email_list = data['email']
        for email in email_list:
            subject = data['subject']
            message = data['message']
            mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
            message = {'from_email': SENDER_EMAIL,'from_name': 'Trestor','subject': subject,'text': message,'to': [{'email': email,'type': 'to'}]}
            result = mandrill_client.messages.send(message=message, async=False, ip_pool='Main Pool')
            print result
        return HttpResponse('Email Sent Successfully!')
    except Exception as e:
        return HttpResponse(str(e))