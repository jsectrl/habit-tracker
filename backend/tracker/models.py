from django.db import models
from django.core.validators import MaxValueValidator

# Day Model
    
class Day(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

# Objective Model
class Objective(models.Model):
    TERM_CHOICE = [
        ('short_term', 'Short Term'),
        ('long_term', 'Long Term')
    ]
    term = models.CharField(max_length = 20, choices=TERM_CHOICE, default='short_term')
    name = models.CharField(max_length=200)
    impact = models.CharField(max_length=300)
    created = models.DateField(auto_now_add=True)
    projected = models.DateField(default=None, null=True)
    time_spent = models.DurationField(default=None, blank=True, null=True)

    def __str__(self):
        return self.name


# Habit Model
class Habit(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now=True)
    objective = models.ForeignKey(Objective, on_delete=models.CASCADE, null=True)
    # Days of the week
    days = models.ManyToManyField(Day)
    # Pomodoro Time Blocks
    pomodoros = models.PositiveSmallIntegerField(validators=[MaxValueValidator(10)], default=0)

    def __str__(self):
        return self.name

