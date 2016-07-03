from django.conf.urls import patterns, url, include
from RetailPartners.views import IndexView
from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from retail_partners.views import *
from report_retail_partners.views import report_rp_data

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'retail_partners', RetailPartnerViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)

accounts_router.register(r'retail_partners', AccountRetailPartnersViewSet)

urlpatterns = patterns(
     '',
    # ... URLs
    url(r'^emd/api/v1/', include(router.urls)),
    url(r'^emd/api/v1/', include(accounts_router.urls)),
    url(r'^emd/api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^emd/api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
	url(r'^emd/get_rp_profile$', get_rp_profile, name='get_rp_profile'),
    url(r'^emd/get_city_profile$', get_city_profile, name='get_city_profile'),
    url(r'^emd/fetch_data_for_validation$', fetch_data_for_validation, name='fetch_data_for_validation'),
	url(r'^emd/retail_partner/update$', update_rp_data, name='update_rp_data'),
	url(r'^emd/deactivate$', deactivate_retail_partner, name='deactivate'),
    url(r'^emd/deactivate_admin$', deactivate_retail_partner_admin, name='deactivate_admin'),
    url(r'^emd/reactivate$', reactivate_retail_partner, name='reactivate'),
    url(r'^emd/reactivate_admin$', reactivate_retail_partner_admin, name='reactivate_admin'),
    url(r'^emd/validate$', validate_rp_data, name='validate'),
    url(r'^emd/send_for_review$', send_for_review, name='send_for_review'),
    url(r'^emd/send_mail$', send_mail, name='send_mail'),
    url(r'^emd/retail-partners$', app_retail_partners, name='app_retail_partners'),
    url(r'^emd/report_retail_partner$', report_rp_data, name='report_rp_data'),
    url('^.*$', IndexView.as_view(), name='index'),
)