from django.urls import path
from .views import get_student_data, home, generate_pdf

urlpatterns = [
    path('students/', get_student_data, name='student-data'),
    path('', home, name='home'),
    # The line `# path('download-progress-pdf/', generate_pdf, name='download_pdf'),` is a
    # commented-out line of code in a Python Django urlpatterns list. This line is currently not
    # active because it is preceded by the `#` symbol, which indicates a comment in Python.
    path('download-progress-pdf/', generate_pdf, name='download_pdf'),
]
