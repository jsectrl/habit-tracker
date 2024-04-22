from rest_framework import serializers
from .models import Habit, Objective, Day


# Day Serializer
class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ['id', 'name']

# Objective Serializer
class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = ['id', 'term', 'name', 'impact', 'created', 'projected', 'time_spent']


# Habit Serializer
class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name', 'description', 'created', 'objective', 'days', 'pomodoros']

