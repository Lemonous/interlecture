# A decorator for request handlers that access a resource.
# Should check access rights and send an error message if anything is wrong.
def need_access(entity,required_access_rights,key=None):
    if not key:key=entity.__name__.lower()
    def decor(f):
        def _f(request,*args,**kwargs):
            name=request.text[key]
            try:obj=entity.objects.get(name=name)
            except entity.DoesNotExist: return request.reply(
                type='INVALID_REQUEST',
                message='No {key} named {name}.'.format(key=key,name=name))
            #TODO:check access rights.
            request.__setattr__(key,obj)
            kwargs[key]=obj
            return f(request,*args,**kwargs)
        return _f
    return decor
