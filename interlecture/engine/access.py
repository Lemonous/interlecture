from engine.messaging import RequestHandlingException,RequestKeyError,need

class RequestedObjectMissingException(RequestHandlingException):
    reportString="No {} '{}' found."

def Provider(entity,by=None,access_rights=None):

    def by_static(request,value):
        try:
            obj=entity.objects.get(**{by:value})
            return obj
        except entity.DoesNotExist:
            raise RequestedObjectMissingException(entity,value) from entity.DoesNotExist
            
    def by_universal(request,value):
        if value[0]=='#':value=value[1:];by='id'
        else:by='name'
        try:
            obj=entity.objects.get(**{by:value})
            return obj
        except entity.DoesNotExist:
            raise RequestedObjectMissingException(entity,value) from entity.DoesNotExist
            
    return by_static if by else by_universal
    

def need_object(entity,access_rights=None,key=None,by=None,optional=False):
    if not key:key=entity.__name__.lower()
    return need(key,optional=optional,provider=
        Provider(entity,by=by,access_rights=access_rights))
