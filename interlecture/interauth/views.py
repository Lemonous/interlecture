from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.contrib.auth import authenticate, login, logout


def login_view(request):
    template = loader.get_template('baste.html')
    context = {'app_name': 'interauth'}
    if request.user.is_authenticated():
        # TODO: Dynamic redirect
        return HttpResponseRedirect('/app/')
    elif request.method == 'POST':
        user = authenticate(username=request.POST['uname'], password=request.POST['passwd'])
        if user is not None:
            login(request, user)
            # TODO: Dynamic redirect
            return HttpResponseRedirect('/app/')
        else:
            context['args'] = '{failedLogin:true,}'
            # TODO: Shortcut render()
            return HttpResponse(template.render(context, request))
    else:
        context['args'] = '{failedLogin:false,}'
        # TODO: Shortcut render()
        return HttpResponse(template.render(context, request))


def logout_view(request):
    logout(request)
    # TODO: Dynamic redirect (view name instead of string)
    return HttpResponseRedirect('/login/')
