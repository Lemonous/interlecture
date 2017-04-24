from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, reverse, redirect
from questions.models import Room


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
