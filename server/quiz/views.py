from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Question
from .serializers import QuestionSerializer
from .utils import GeminiQuestionGenerator
import os

class QuestionGeneratorView(APIView):
    def get(self, request):
        difficulty = request.query_params.get('difficulty', 'easy')
        subject = request.query_params.get('subject', 'Physics')
        
        api_key = "AIzaSyCPw7AdBH_qMIZdIdwoOsgNpfYPw47IBeY"
        generator = GeminiQuestionGenerator(api_key)
        
        question_data = generator.generate_mcq(difficulty, subject)
        
        if question_data:
            serializer = QuestionSerializer(data=question_data)
            if serializer.is_valid():
                question = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(
            {"error": "Could not generate question"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class QuestionListView(APIView):
    def get(self, request):
        difficulty = request.query_params.get('difficulty')
        questions = Question.objects.filter(difficulty=difficulty)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)