from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id', 'text', 'difficulty', 
            'option1', 'option2', 'option3', 'option4', 
            'correct_option'
        ]