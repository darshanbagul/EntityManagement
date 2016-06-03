from django.http import HttpResponse
import json
from pymongo import MongoClient
import time
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
client = MongoClient()
db = client['rp_data_errors']
coll = db['report_retail_partner_data']

@csrf_exempt
def report_rp_data(request):
    rp_id = request.POST['retail_partner_id']
    reporter_id = request.POST['uin']
    error_reported = request.POST['error']
    curr_timestamp = time.time()
    rp_doc = coll.find_one({'rp_id': int(rp_id)})
    try:
        existing_reports = rp_doc['reports']
        num_reports = int(rp_doc['num_reports'])
        existing_reports.append({
            'id' : num_reports + 1,
            'error' : error_reported,
            'timestamp' : curr_timestamp,
            'reporter_id' : reporter_id
        })
        coll.update({'rp_id': int(rp_id)},{'reports': existing_reports, 'num_reports' : num_reports+1, 'rp_id': int(rp_id)})
    except Exception as e:
        rp_doc = {
            'rp_id' : int(rp_id),
            'reports' : [{
                'id' : 1,
                'error' : error_reported,
                'timestamp' : curr_timestamp,
                'reporter_id' : reporter_id
            }],
            'num_reports' : 1
        }
        coll.insert(rp_doc)
    return HttpResponse('Successfully Reported')