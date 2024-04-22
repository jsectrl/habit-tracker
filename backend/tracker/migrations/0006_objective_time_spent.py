# Generated by Django 4.2.10 on 2024-03-30 23:42

from django.db import migrations, models

from datetime import timedelta


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0005_habit_pomodoros'),
    ]

    operations = [
        migrations.AddField(
            model_name='objective',
            name='time_spent',
            field=models.DurationField(default=timedelta(days=0, hours=0, minutes=0, seconds=0)),
        ),
    ]
