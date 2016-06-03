import json
from pymongo import MongoClient

client = MongoClient()
db = client['retail_partners']
coll = db['rp_images']

def map_retail_partner_images(rp_images, rp_id):
    for rp_image in rp_images:
        url = rp_image['url']
        hash_name = url.split('/')[-1]
        print hash_name
        rp_doc = coll.find_one({'rp_id': int(rp_id)})
        try:
            existing_images = rp_doc['images']
            existing_images.append(str(hash_name))
            coll.update({'rp_id': int(rp_id)},{'images': existing_images, 'rp_id': int(rp_id)})
        except Exception as e:
            rp_doc = {
                'rp_id' : int(rp_id),
                'images' : [str(hash_name)],
            }
            coll.insert(rp_doc)