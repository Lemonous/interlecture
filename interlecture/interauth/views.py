from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, reverse

from interauth.forms import UserForm

import re


def login_view(request):
    context = {'app_name': 'login'}
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('app'))
    elif request.method == 'POST':
        user = authenticate(username=request.POST['uname'], password=request.POST['passwd'])
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('app'))
        else:
            context['args'] = '{failedLogin:true,}'
            return render(request, 'base.html', context=context)
    else:
        context['args'] = '{failedLogin:false,}'
        return render(request, 'base.html', context=context)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))


def register_view(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('app'))

    context = {}
    if request.method == 'POST':
        form = UserForm(request.POST)

        if form.is_valid():
            new_user = User.objects.create_user(
                username=request.POST['username'],
                email=request.POST['email'],
                password=request.POST['password'],
                first_name=request.POST['firstname'],
                last_name=request.POST['lastname'],
                is_active=False
            )
            # TODO: Email activation of user
        else:
            context['args'] = form.d2r_friendly_errors()
            context['app_name'] = 'register'
            return render(request, 'base.html', context=context)

    else:
        context['app_name'] = 'register'
        context['args'] = '{}'
        return render(request, 'base.html', context=context)
