from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader

def app_view(request):
    if request.user.is_authenticated():
      return HttpResponse(loader.get_template('base.html').render({'app_name':'app'}, request))
    else: return HttpResponseRedirect('/login/')
