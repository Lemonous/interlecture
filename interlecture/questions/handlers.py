#Request handlers

import channels
from questions.models import *
from django.core import serializers
import json
from engine.messaging import serverMessage
from engine.access import need_access

def room_channel(room):
    return channels.Group('interlecture.questions.room%d'%room.id)
    
@need_access(Classroom,'read')
def subscribe(request,classroom=None):
    room_channel(classroom).add(request.message.reply_channel)
    request.send(type='ADD_QUESTIONS',
        data=[question.dictize() for question in Question.objects.filter(classroom=classroom)])

@need_access(Classroom,'write')
def post_question(request,classroom=None):
    question=Question(classroom=classroom,user=request.message.user,text=request.text.message_text)
    question.save()
    serverMessage(room_channel(classroom),type='ADD_QUESTIONS',data=[question.dictize()])

handlers={
    'subscribe':subscribe,
    'post_question':post_question
  }
