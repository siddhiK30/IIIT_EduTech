from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import StudentProgress
from .serializers import StudentProgressSerializer
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="student_progress_report.pdf"'

    # Create a PDF document
    doc = SimpleDocTemplate(response, pagesize=letter)
    elements = []
    
    # Styles
    styles = getSampleStyleSheet()
    title_style = styles["Title"]
    heading_style = styles["Heading2"]
    normal_style = styles["Normal"]

    # Title
    elements.append(Paragraph("Student Progress Report", title_style))
    elements.append(Spacer(1, 12))

    # Student Information
    elements.append(Paragraph("Student Name: John Doe", normal_style))
    elements.append(Paragraph("Class: 10th Grade", normal_style))
    elements.append(Paragraph("Report Date: 14th Feb 2025", normal_style))
    elements.append(Spacer(1, 12))

    # Progress Summary
    elements.append(Paragraph("Overall Performance Summary", heading_style))
    summary_data = [
        ["Subject", "Completion (%)", "Performance Level"],
        ["Mathematics", "85%", "Excellent"],
        ["Science", "75%", "Good"],
        ["English", "80%", "Very Good"],
        ["History", "65%", "Average"],
        ["Computer Science", "90%", "Outstanding"],
    ]

    table = Table(summary_data, colWidths=[2.5 * inch, 1.5 * inch, 2 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(table)
    elements.append(Spacer(1, 12))

    # Skills Progress
    elements.append(Paragraph("Skill Development Progress", heading_style))
    skills_data = [
        ["Skill", "Proficiency (%)"],
        ["Critical Thinking", "85%"],
        ["Problem Solving", "78%"],
        ["Communication", "92%"],
        ["Teamwork", "80%"],
    ]

    skills_table = Table(skills_data, colWidths=[3 * inch, 2 * inch])
    skills_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
        ("BACKGROUND", (0, 1), (-1, -1), colors.lightgrey),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(skills_table)
    elements.append(Spacer(1, 12))

    # Activities & Achievements
    elements.append(Paragraph("Recent Achievements & Activities", heading_style))
    elements.append(Paragraph("- Completed Algebra Module - Scored 92%, showing excellent understanding.", normal_style))
    elements.append(Paragraph("- Started Science Project - Research on Renewable Energy Sources.", normal_style))
    elements.append(Paragraph("- Reading Challenge - Finished 3 books this month.", normal_style))
    elements.append(Spacer(1, 12))

    # Recommendations Section (Not Bold)
    elements.append(Paragraph("Recommendations for Improvement", heading_style))
    elements.append(Paragraph("1. Mathematics: Focus on Trigonometry to improve further.", normal_style))
    elements.append(Paragraph("2. Science: Enhance understanding of Physics concepts.", normal_style))
    elements.append(Paragraph("3. Communication: Engage in more public speaking activities.", normal_style))
    elements.append(Spacer(1, 12))

    # Signature Section
    elements.append(Paragraph("Mentor: Dr. Smith", normal_style))
    elements.append(Paragraph("Next Review: 1st March 2025", normal_style))
    
    # Build PDF
    doc.build(elements)

    return response

@api_view(['GET'])
def get_student_data(request):
    students = StudentProgress.objects.all()
    serializer = StudentProgressSerializer(students, many=True)
    return Response(serializer.data)
