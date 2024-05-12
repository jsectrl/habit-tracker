from django.db import models
from django.core.validators import MaxValueValidator
from django.utils.text import slugify

from datetime import timedelta

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
    created_at = models.DateField(auto_now_add=True)
    projected = models.DateField(default=None, null=True)
    time_spent = models.DurationField(default=timedelta(0), blank=True, null=True)
    slug = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate slug based on the name field
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

# Habit Model
class Habit(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    created_at = models.DateField(auto_now=True)
    objective = models.OneToOneField(Objective, on_delete=models.CASCADE, null=True)
    # Days of the week
    days = models.ManyToManyField(Day)
    # Pomodoro Time Blocks
    pomodoros = models.PositiveSmallIntegerField(validators=[MaxValueValidator(10)], default=1)
    slug = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate slug based on the name field
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)