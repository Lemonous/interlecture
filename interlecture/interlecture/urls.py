"""interlecture URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views import generic
from interauth.views import login_view, logout_view, register, activate, resend_activation_link
from courses.views import course_select_view, course_create_view
from questions.views import questions_view

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^course/(?P<room_name>.+)$', questions_view, name='course'),
    url(r'^courses/$', course_select_view, name='select-course'),
    url(r'^create-course/$', course_create_view, name='create-course'),
    url(r'^login/$', login_view, name='login'),
    url(r'^logout/$', logout_view, name='logout'),
    url(r'^register/$', register, name='register'),
    url(r'^activate/(?P<key>.+)$', activate, name='activate'),
    url(r'^app/$', generic.base.RedirectView.as_view(url='/course/test'), name='app'),
    url(r'^resend-activation/$', resend_activation_link, name='resend-activation'),
    # TODO: Dynamically redirect
    url(r'^$', generic.base.RedirectView.as_view(url='login/')),
]
