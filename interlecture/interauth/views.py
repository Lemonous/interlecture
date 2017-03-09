from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, reverse


def login_view(request):
    context = {'app_name': 'interauth'}
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
