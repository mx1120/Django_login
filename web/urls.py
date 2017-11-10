#coding:utf-8
from django.conf.urls import patterns, url, include
from web import views

from django.http import HttpResponse
#
# urlpatterns = [
#     (r'^main$', include('web.index.urls'))
# ]

# urlpatterns = patterns('web.views',
#                        (r'^$', 'infomation')
#                )
urlpatterns = [
    url(r'^$', views.index),
    url(r'^one/$', views.one),
    url(r'^login/$', views.login),
    url(r'^register/$', views.register)
]

urlpatterns += [
    url(r'^post_login', views.r_login),
    url(r'^post_register', views.r_register)
]