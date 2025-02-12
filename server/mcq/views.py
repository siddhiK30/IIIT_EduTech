from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from mcq.models import Question
from mcq.utils.gemini import generate_mcq
import random

def calculate_level(score):
    """
    Calculate difficulty level based on score with smoother transitions.
    """
    if score <= 0:
        return 'easy'
    elif score <= 3:
        return 'easy'
    elif score <= 7:
        return 'medium'
    else:
        return 'hard'

def calculate_score_change(is_correct, current_level):
    """
    Calculate score change based on difficulty and correctness.
    """
    if is_correct:
        score_mapping = {'easy': 1, 'medium': 2, 'hard': 3}
        return score_mapping.get(current_level, 1)
    else:
        penalty_mapping = {'easy': -1, 'medium': -1, 'hard': -2}
        return penalty_mapping.get(current_level, -1)


class QuestionView(APIView):
    """
    API view to retrieve a question based on the user's current score and difficulty level.
    """
    def get(self, request, format=None):
        # Initialize session variables if not present
        score = request.session.get('score', 0)
        level = request.session.get('level', 'easy')
        answered_questions = request.session.get('answered_questions', [])

        # Get a question that hasn't been answered yet
        question = Question.objects.filter(difficulty=level).exclude(id__in=answered_questions).order_by('?').first()

        # Generate a new question if none are available
        if not question:
            question = generate_mcq(level)
            if question:
                question.save()

        if not question:
            return Response({"message": "Unable to generate questions at the moment."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        # Prepare the response
        response_data = {
            "id": question.id,
            "text": question.text,
            "difficulty": question.difficulty,
            "options": [question.option1, question.option2, question.option3, question.option4],
            "score": max(0, score),
            "correct_streak": request.session.get('correct_streak', 0)
        }

        return Response(response_data, status=status.HTTP_200_OK)


class SubmitAnswerView(APIView):
    """
    API view to submit an answer and update the user's score and level.
    """
    def post(self, request, format=None):
        question_id = request.data.get('question_id')
        selected_option = request.data.get('selected_option')

        try:
            # Get the question
            question = Question.objects.get(id=question_id)
            current_level = request.session.get('level', 'easy')

            # Track answered questions
            answered_questions = request.session.get('answered_questions', [])
            if question_id not in answered_questions:
                answered_questions.append(question_id)
                request.session['answered_questions'] = answered_questions

            # Check answer and update score
            is_correct = selected_option == question.correct_option
            score_change = calculate_score_change(is_correct, current_level)
            request.session['score'] = request.session.get('score', 0) + score_change

            # Update correct streak and bonus points for streaks
            if is_correct:
                request.session['correct_streak'] = request.session.get('correct_streak', 0) + 1
                if request.session['correct_streak'] >= 3:
                    request.session['score'] += 1  # Bonus point for maintaining streak
            else:
                request.session['correct_streak'] = 0

            # Update difficulty level based on new score
            request.session['level'] = calculate_level(request.session['score'])

            # Ensure score doesn't go below 0
            request.session['score'] = max(0, request.session['score'])
            request.session.modified = True

            return Response({"message": "Answer submitted successfully."}, status=status.HTTP_200_OK)

        except Question.DoesNotExist:
            return Response({"error": "Invalid question ID."}, status=status.HTTP_400_BAD_REQUEST)


class ResetQuizView(APIView):
    """
    API view to reset all quiz-related session variables.
    """
    def post(self, request, format=None):
        request.session['score'] = 0
        request.session['level'] = 'easy'
        request.session['answered_questions'] = []
        request.session['correct_streak'] = 0
        request.session.modified = True
        return Response({"message": "Quiz reset successfully."}, status=status.HTTP_200_OK)
