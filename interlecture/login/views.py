from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from django.contrib.auth import authenticate, login, logout

def login_view(request):
    template = loader.get_template('base.html')
    context={'app_name':'login'}
    if request.user.is_authenticated():
      return HttpResponseRedirect('/app/')
    elif request.method == 'POST':
      user=authenticate(username=request.POST['uname'],password=request.POST['passwd'])
      if user is not None:
        login(request,user)
        return HttpResponseRedirect('/app/')
      else:
        context['args']='{failedLogin:true,}'
        return HttpResponse(template.render(context, request))
    else:
      context['args']='{failedLogin:false,}'
      return HttpResponse(template.render(context, request))

def logout_view(request):
  logout(request)
  return HttpResponseRedirect('/login/')
