from engine.messaging import RequestHandlingException,RequestKeyError,need

class RequestedObjectMissingException(RequestHandlingException):
    reportString="No {} '{}' found."

class NoAccessRightsException(RequestHandlingException):
    reportString="You are not allowed to {} object {}"

def Provider(entity,by='id',access_rights=None):
    def _f(request,value):
        try:obj=entity.objects.get(**{by:value})
        except entity.DoesNotExist:
            raise RequestedObjectMissingException(entity,value) from entity.DoesNotExist
        if access_rights:obj.request_access_rights(request.message.user,access_rights)
        return obj
    return _f

def need_object(entity,access_rights=None,key=None,by='id',optional=False):
    if not key:key=entity.__name__.lower()
    return need(key,optional=optional,provider=
        Provider(entity,by=by,access_rights=access_rights))
