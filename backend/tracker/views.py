from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json

from .models import Habit, Objective, Day
from .forms import HabitForm, ObjectiveForm
from .serializers import ObjectiveSerializer, HabitSerializer, DaySerializer


import logging
logging.basicConfig(filename='mylog.log', level=logging.DEBUG)

# Objectives
def get_objectives(request):
    objectives = Objective.objects.all()
    serializer = ObjectiveSerializer(objectives, many=True)
    return JsonResponse({'objectives' : serializer.data}, safe=False)

@csrf_exempt
def create_objective(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        new_objective_serializer = ObjectiveSerializer(data=data)
        if new_objective_serializer.is_valid():
            new_objective_serializer.save()
        else:
            print("ERROR: Unable to create new Objective based on data provided")
    else:
        pass
    return JsonResponse({"message" : "create_objective return"})


# Habits
def get_habits(request):
    habits = Habit.objects.all()
    serializer = HabitSerializer(habits, many=True)
    print(serializer.data)
    return JsonResponse({'habits' : serializer.data}, safe=False)

# Register a new Habit
@csrf_exempt
def create_habit(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_habit_serializer = HabitSerializer(data=data)
        if new_habit_serializer.is_valid(): 
            new_habit_serializer.save()
        else:
            print("ERROR: Unable to create new Habit based on data provided")
    else : 
        pass
    return JsonResponse({"message": "create_habit return"})

def get_habits_for_day(request, day):
    habits = Habit.objects.filter(days__name__iexact=day)
    serializer = HabitSerializer(habits, many=True)
    return JsonResponse({'habits' : serializer.data}, safe=False)

def get_habit_info_by_slug(request, slug):
    habit = get_object_or_404(Habit, slug=slug)
    serializer = HabitSerializer(habit)
    return JsonResponse(serializer.data, safe=False)

# Days
def get_days(request):
    days = Day.objects.all()
    serializer = DaySerializer(days, many=True)
    return JsonResponse({'days' : serializer.data}, safe=False)
