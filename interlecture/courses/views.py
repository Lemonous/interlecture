from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, reverse, redirect
from questions.models import Room


# Create your views here.
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
