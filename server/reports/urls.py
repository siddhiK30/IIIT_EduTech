from django.urls import path
from .views import generate_pdf


urlpatterns = [
    # path('students/', get_student_data, name='student-data'),
    path('download-progress-pdf/', generate_pdf, name='download_pdf'),
]
