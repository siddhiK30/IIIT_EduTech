# Generated by Django 5.0.2 on 2025-02-10 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentor',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
