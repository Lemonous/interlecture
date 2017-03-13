from engine.messaging import RequestKeyError

def need_object(entity,access_rights=None,key=None,optional=True,by='id'):
    if not key:key=entity.__name__.lower()
    def decor(f):
        def _f(request,*args,**kwargs):
            try:obj_id=request.text[key]
            except RequestKeyError:pass
            else:
                try:obj=entity.objects.get(**{by:obj_id})
                except entity.DoesNotExist: return request.reply(
                    type='INVALID_REQUEST',
                    message='No {key} {name}.'.format(key=key,name=obj_id))
                request.__setattr__(key,obj)
                kwargs[key]=obj
            return f(request,*args,**kwargs)
        return _f
    return decor
