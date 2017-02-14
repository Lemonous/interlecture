from django.http import HttpResponse
from django.template import loader

def templateViewWithContext(template_name,**context):
    template = loader.get_template(template_name)
    def view(request):
      return HttpResponse(template.render(context, request))
    return view
