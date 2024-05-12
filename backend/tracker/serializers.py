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
        fields = "__all__"


# Habit Serializer
class HabitSerializer(serializers.ModelSerializer):
    days = DaySerializer(many=True, read_only=False)
    objective = ObjectiveSerializer(read_only=False)

    class Meta:
        model = Habit
        fields = "__all__"

    def create(self, validated_data):
        selectedDays = validated_data.pop('days')
        selectedObjective = validated_data.pop('objective')
        new_habit = Habit.objects.create(**validated_data)
        for selectedDay in selectedDays:
            day = Day.objects.get(name=selectedDay['name'])
            new_habit.days.add(day)
        
        new_habit.objective = Objective.objects.get(name=selectedObjective['name'])
        new_habit.save()
        return new_habit
