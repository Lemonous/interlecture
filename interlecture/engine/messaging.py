import json

def serverMessage(channel,**kwargs):
    channel.send({'text':json.dumps(kwargs)})

class RequestHandlingException(Exception):
    reportString="An exception occured while handling the request."
    def report(self):
        return self.reportString.format(*self.args)

class NoSuchRequestHandlerException(RequestHandlingException):
    reportString="No handler for request {}.{}"

class RequestKeyError(KeyError,RequestHandlingException):
    reportString="Mandatory argument '{}' is missing."

class RequestDict(dict):
    __getattr__ = dict.__getitem__
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__
    def __missing__(self,key):
        raise RequestKeyError(key)

class Request:
    def __init__(self,message):
        self.message=message
        self.text=json.loads(message.content['text'],object_hook=RequestDict)

    def handle(self):
        try:
            try: handler=handlers[self.text.app][self.text.command]
            except KeyError as e:
                raise NoSuchRequestHandlerException(self.text.app,self.text.command) from e
            else:return handler(self)
        except RequestHandlingException as e:self.reply(
            type='INVALID_REQUEST',message=e.report())

    def send(self,**kwargs):
        serverMessage(self.message.reply_channel,**kwargs)

    def reply(self,**kwargs):
        try: self.send(request_id=self.text.request_id,**kwargs)
        except RequestKeyError:pass

def need(key,optional=False,provider=lambda r,x:x):
    def decor(f):
        def _f(request,*args,**kwargs):
            try: kwargs[key]=provider(request,request.text[key])
            except RequestKeyError:
                if not optional:raise
            return f(request,*args,**kwargs)
        return _f
    return decor

@need('foo')
def test(request,foo=None):
    request.reply(type='TEST',bar=foo)

import questions.handlers
handlers={
    'questions':questions.handlers.handlers,
    'test':{'test':test}
  }
