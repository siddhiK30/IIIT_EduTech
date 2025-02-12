from django.urls import path
from mcq.views import QuestionView, SubmitAnswerView, ResetQuizView  # Adjust import path as needed

urlpatterns = [
    path('question/', QuestionView.as_view(), name='get_question'),
    path('submit-answer/', SubmitAnswerView.as_view(), name='submit_answer'),
    path('reset-quiz/', ResetQuizView.as_view(), name='reset_quiz'),
]
