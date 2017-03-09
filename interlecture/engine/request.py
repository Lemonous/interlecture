import json
from engine.consumers import handlers

class Request:
    def __init__(self,message):
        self.message=message
        self.json=json.loads(message.content['text'])
    
    def handle(self):
        try:handler=handlers[self.json['app']][self.json['command']]
        except KeyError:
            self.reportError('Unknown command.') #TODO: Error message
            return
        return handler(self)
    
    def reportError(self,msg):
        if 'request_id' in self.json and self.json['request_id']:
            self.message.reply_channel.send({'text': json.dumps({
                'type':'INVALID_REQUEST',
                'request_id':self.json['request_id'],
                'message':msg
              })})
