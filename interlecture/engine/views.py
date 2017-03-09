from django.shortcuts import render, redirect, reverse


def app_view(request):
    if request.user.is_authenticated():
        return render(request, 'base.html', context={'app_name': 'app'})
    else:
        return redirect(reverse('login'))
