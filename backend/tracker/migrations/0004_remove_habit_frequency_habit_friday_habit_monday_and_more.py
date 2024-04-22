# Generated by Django 4.2.10 on 2024-03-30 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0003_habit_frequency'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='habit',
            name='frequency',
        ),
        migrations.AddField(
            model_name='habit',
            name='friday',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='habit',
            name='monday',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='habit',
            name='saturday',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='habit',
            name='sunday',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='habit',
            name='thursday',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='habit',
            name='tuesday',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='habit',
            name='wednesday',
            field=models.BooleanField(default=False),
        ),
    ]