from django.contrib import admin

# Register your models here.

from questions.models import Question,Classroom
class ClassroomAdmin(admin.ModelAdmin):
    model=Classroom
    readonly_fields=('id',)

admin.site.register(Classroom)

