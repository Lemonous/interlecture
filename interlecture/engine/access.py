from engine.messaging import RequestHandlingException,RequestKeyError,need

class RequestedObjectMissingException(RequestHandlingException):
    reportString="No {} '{}' found."

def Provider(entity,by=None,access_rights=None):
    def _f(request,key):
        try:obj=entity.objects.get(**key)
        except entity.DoesNotExist:
            raise RequestedObjectMissingException(entity,key) from entity.DoesNotExist
        if access_rights:obj.request_access_rights(request,access_rights)
        return obj
    
    def dyn_f(request,value):
       if value[0]=='#':return _f(request,{'id':value[1:]})
       else:return  _f(request,{'name':value})
            
    if by:return lambda request,value:_f(request,{by:value})
    else:return dyn_f
    

def need_object(entity,access_rights=None,key=None,by=None,optional=False):
    if not key:key=entity.__name__.lower()
    return need(key,optional=optional,provider=
        Provider(entity,by=by,access_rights=access_rights))
