from django.contrib import admin
from .models import Objective, Habit, Day

admin.site.register(Habit)
admin.site.register(Objective)
admin.site.register(Day)
