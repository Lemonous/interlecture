import json

def serverMessage(channel,**kwargs):
    channel.send({'text':json.dumps(kwargs)})

class RequestKeyError(KeyError):
    pass

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
        try: handler=handlers[self.text.app][self.text.command]
        except KeyError:
            self.reply(type='INVALID_REQUEST',
              message='No handler for {app} {command} command.'
              .format(app=self.text.app,command=self.text.command))
        else: return handler(self)
    
    def send(self,**kwargs):
        serverMessage(self.message.reply_channel,**kwargs)
      
    def reply(self,**kwargs):
        try: self.send(request_id=self.text.request_id,**kwargs)
        except RequestKeyError:pass


import questions.handlers
handlers={
    'questions':questions.handlers.handlers
  }
