#Request handlers

from channels import Group
from questions.models import *
from django.core import serializers
import json

# A decorator for request handlers that access classroom.
# Should check access rights and send an error message if anything is wrong.
def access_classroom(required_access_rights):
    def decor(f):
        def _f(request,*args,**kwargs):
            try:request.classroom=Classroom.objects.get(name=request.json['classroom'])
            except Classroom.DoesNotExist:print("     Error!!!",request.json['classroom']) #TODO: send error message.
            #TODO:check access rights.
            return f(request,*args,**kwargs)
        return _f
    return decor
    
@access_classroom('read')
def subscribe(request):
    Group('interlecture.questions.classroom%d'%request.classroom.id).add(request.message.reply_channel)
    request.message.reply_channel.send({'text': json.dumps({
        'type':'ADD_QUESTIONS',
        'data':list(question.dictize() for question in Question.objects.filter(classroom=request.classroom))
      })})

@access_classroom('write')
def post_question(request):
    question=Question(classroom=request.classroom,user=request.message.user,text=request.json['message_text'])
    question.save()
    Group('interlecture.questions.classroom%d'%request.classroom.id).send({'text': json.dumps({
        'type':'ADD_QUESTIONS',
        'data':[question.dictize()]
      })})

handlers={
    'subscribe':subscribe,
    'post_question':post_question
  }
