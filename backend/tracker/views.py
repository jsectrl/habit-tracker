from django.http import JsonResponse
from .models import Habit, Objective, Day
from .serializers import ObjectiveSerializer, HabitSerializer, DaySerializer
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

# Objectives
def get_objectives(request):
    objectives = Objective.objects.all()
    serializer = ObjectiveSerializer(objectives, many=True)
    return JsonResponse({'objectives' : serializer.data}, safe=False)


# Habits
def get_habits(request):
    habits = Habit.objects.all()
    serializer = HabitSerializer(habits, many=True)
    return JsonResponse({'habits' : serializer.data}, safe=False)

@csrf_exempt
def create_habit(request):
    print(request.body)
    return JsonResponse({"message":"hello from server"})

def get_habits_for_day(request, day):
    habits = Habit.objects.filter(days__name__iexact=day)
    serializer = HabitSerializer(habits, many=True)
    return JsonResponse({'habits' : serializer.data}, safe=False)


# Days
def get_days(request):
    days = Day.objects.all()
    serializer = DaySerializer(days, many=True)
    return JsonResponse({'days' : serializer.data}, safe=False)
