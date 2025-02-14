from django.urls import path
from .views import FileProcessView

urlpatterns = [
    path('process-file/', FileProcessView.as_view(), name='process-file'),
]