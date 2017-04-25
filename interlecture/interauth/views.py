from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.shortcuts import render, reverse

from interlecture.local_settings import HOSTNAME,EMAIL_FROM

import datetime
import hashlib
import random
import dateutil.tz

from interauth.forms import UserForm
from interauth.models import UserActivation


def login_view(request):
    context = {'app_name': 'login'}

    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('select-course'))

    elif request.method == 'POST':
        user = authenticate(username=request.POST['uname'], password=request.POST['passwd'])

        if user is not None:
            login(request, user)
            if request.user.is_authenticated():
                messages.info(request, "True")
            return HttpResponseRedirect(reverse('select-course'))

        else:
            context['args'] = '{failedLogin:true,}'
            return render(request, 'base.html', context=context)

    else:
        context['args'] = '{failedLogin:false,}'
        return render(request, 'base.html', context=context)


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))


def register(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('select-course'))

    context = {}
    if request.method == 'POST':
        form = UserForm(request.POST)

        if form.is_valid():
            new_user = User.objects.create_user(
                username=request.POST['username'],
                email=request.POST['email'],
                password=request.POST['password'],
                first_name=request.POST['first_name'],
                last_name=request.POST['last_name'],
                is_active=False
            )
            # TODO: Email activation of user

            init_activation(new_user)

            context['args'] = '{}'
            context['app_name'] = 'login'
            return render(request, 'base.html', context=context)

        else:
            context['args'] = '{' + form.d2r_friendly_errors() + form.safe_data() + '}'
            context['app_name'] = 'register'
            return render(request, 'base.html', context=context)

    else:
        context['app_name'] = 'register'
        context['args'] = '{}'
        return render(request, 'base.html', context=context)


def activate(request, key):
    try:
        activation = UserActivation.objects.get(activation_key=key)
    except ObjectDoesNotExist:
        return HttpResponseRedirect(reverse('register'))

    if not activation.user.is_active:
        if datetime.datetime.now(tz=dateutil.tz.tzlocal()) > activation.key_expires:
            return HttpResponseRedirect(reverse('resend-activation'))

        else:
            activation.user.is_active = True
            activation.user.save()

    return HttpResponseRedirect(reverse('select-course'))


def resend_activation_link(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('select-course'))

    if request.method == 'POST':
        try:
            user = User.objects.get(email=request.POST['email'])
            if user.is_active:
                return HttpResponseRedirect(reverse('login'))
            activation = UserActivation.objects.get(user=user)
            activation.key_expires = datetime.datetime.now(dateutil.tz.tzlocal()) + datetime.timedelta(days=2)
            send_activation_mail(activation)
            return HttpResponseRedirect('login')
        except ObjectDoesNotExist:
            return HttpResponseRedirect(reverse('resend-activation'))

    context = {
        'app_name': 'resend_activation',
        'args': '{}'
    }
    return render(request, 'base.html', context=context)


def init_activation(user):
    salt = hashlib.sha1(str(random.random()).encode('utf8')).hexdigest()[:8]
    usernamesalt = user.username

    activation = UserActivation()
    activation.user = user
    activation.activation_key = hashlib.sha1(str(salt + usernamesalt).encode('utf8')).hexdigest()
    activation.key_expires = datetime.datetime.now(dateutil.tz.tzlocal()) + datetime.timedelta(days=2)
    activation.save()

    send_activation_mail(activation)


def send_activation_mail(activation):
    mail_body = render_to_string('activation_mail.html', context={'activation': activation,'HOSTNAME':HOSTNAME})
    _ = send_mail(
        subject='Interlecture Account Activation',
        message='',
        from_email=EMAIL_FROM,
        recipient_list=[activation.user.email],
        html_message=mail_body
    )
