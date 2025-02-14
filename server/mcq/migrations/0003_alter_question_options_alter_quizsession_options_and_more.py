# Generated by Django 5.0.2 on 2025-02-14 17:39

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mcq', '0002_quizsession'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='quizsession',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddField(
            model_name='question',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='quizsession',
            name='current_streak',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='quizsession',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='difficulty',
            field=models.CharField(choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')], default='easy', max_length=10),
        ),
        migrations.CreateModel(
            name='QuestionAttempt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('selected_option', models.CharField(blank=True, max_length=255, null=True)),
                ('is_correct', models.BooleanField(null=True)),
                ('score_change', models.IntegerField(default=0)),
                ('attempted_at', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mcq.question')),
                ('quiz_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mcq.quizsession')),
            ],
            options={
                'ordering': ['attempted_at'],
                'unique_together': {('quiz_session', 'question')},
            },
        ),
        migrations.AddField(
            model_name='quizsession',
            name='questions',
            field=models.ManyToManyField(through='mcq.QuestionAttempt', to='mcq.question'),
        ),
    ]
