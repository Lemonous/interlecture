import json
from engine.consumers import handlers

class Request:
    def __init__(self,message):
        self.message=message
        self.json=json.loads(message.content['text'])
    
    def handle(self):
        try:handler=handlers[self.json['app']][self.json['command']]
        except KeyError:pass #TODO: Error message
        return handler(self)
