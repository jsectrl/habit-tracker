from django.forms import ModelForm
from django.forms import CheckboxSelectMultiple, ModelMultipleChoiceField

from .models import Habit, Objective, Day

class HabitForm(ModelForm):
    class Meta:
        model = Habit
        fields = ['name', 'description', 'days']

class ObjectiveForm(ModelForm):
    class Meta:
        model = Objective
        fields = ['term', 'name', 'impact', 'projected', 'time_spent']    #days = ModelMultipleChoiceField(queryset=Day.objects.all())
