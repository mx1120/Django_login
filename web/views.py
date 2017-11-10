#coding:utf-8
from django.http import HttpResponse
from libs.utils.common import render_template
from libs.utils import db
import pymysql

# def conn():
#     conn = pymysql.connections(
#         name="login",
#         host="192.168.8.37",
#         password="123456",
#         charset="utf-8"
#     )
#     return conn
def index(request):
    print 123
    return render_template(request, 'index/index.html')

def one(request):
	return render_template(request, 'index/one.html')

def login(request):
    print 'login HTML'
    return render_template(request, 'index/login.html')

def register(request):
    print 'register HTML'
    return render_template(request, 'index/register.html')

# 登录接口
def r_login(request):
    # username = request.POST.get("username")
    # password = request.POST.get('password')
    userInfo =  db.default.login.get(username = '', password = '')
    print 'r_login'

def r_register(request):
    print 'r_register'