from django.shortcuts import render, redirect, reverse
from questions.models import Room
from django.core.exceptions import ObjectDoesNotExist


def questions_view(request, room_name):
    if request.user.is_authenticated() and request.user.is_active:
        try:
            room = Room.objects.get(name=room_name)
        except Room.DoesNotExist:
            return redirect(reverse('select-course'))
        args = {
            'moderator_mode': 'true' if room.moderator.filter(id=request.user.id).exists() else 'false',
            'my_uname': request.user.username,
            'classroom': room.get(),
            'lecturer_name': '%s %s' % (room.lecturer.first_name, room.lecturer.last_name)
        }
        return render(request, 'base.html', context={'app_name': 'app', 'args': args})
    else:
        return redirect(reverse('login'))


def course_select_view(request):
    if not request.user.is_authenticated:
        return redirect(reverse('login'))

    if request.method == 'POST':
        try:
            course = Room.objects.get(name=request.POST['name'])

            return redirect(reverse('course', args=[course.name]))

        except ObjectDoesNotExist:
            context = {
                'app_name': 'course_select',
                'args': '{courseName:"' + request.POST['name'] + '",doesNotExist:true}'
            }
            return render(request, 'base.html', context=context)

    context = {
        'app_name': 'course_select',
        'args': '{}'
    }
    return render(request, 'base.html', context=context)


def course_create_view(request):
    if not request.user.is_authenticated:
        return redirect(reverse('login'))

    if request.user.is_active:
        if request.method == 'POST':
            course = Room(name=request.POST['name'], lecturer=request.user)
            course.save()

            return redirect(reverse('course', args=[course.name]))

    return redirect(reverse('select-course'))
