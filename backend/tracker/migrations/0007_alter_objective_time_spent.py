# Generated by Django 4.2.10 on 2024-03-30 23:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0006_objective_time_spent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='objective',
            name='time_spent',
            field=models.DurationField(default=datetime.timedelta(0)),
        ),
    ]