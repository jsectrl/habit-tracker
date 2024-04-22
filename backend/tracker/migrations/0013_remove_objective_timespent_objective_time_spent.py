# Generated by Django 4.2.10 on 2024-03-31 01:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0012_rename_time_spent_objective_timespent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='objective',
            name='timeSpent',
        ),
        migrations.AddField(
            model_name='objective',
            name='time_spent',
            field=models.DurationField(default=datetime.timedelta(0), null=True),
        ),
    ]