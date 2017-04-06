from django.shortcuts import render, redirect, reverse
from questions.models import Room
import json

def questions_view(request,room_name):
    if request.user.is_authenticated() and request.user.is_active:
        try: room=Room.objects.get(name=room_name)
        except Room.DoesNotExist: return redirect(reverse('select-course'))
        args={
            'moderator_mode': 'true' if room.moderator.filter(id=request.user.id).exists() else 'false',
            'my_uname': request.user.username,
            'classroom': room.get(),
          }
        return render(request, 'base.html', context={'app_name': 'app','args':args})
    else:
        return redirect(reverse('login'))
