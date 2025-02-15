import google.generativeai as genai
import os
import logging
from .models import Question
import random

logger = logging.getLogger(__name__)

class GeminiQuestionGenerator:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-pro")

    def generate_mcq(self, difficulty="easy", subject="Physics"):
        try:
            prompt = self._create_prompt(difficulty, subject)
            response = self.model.generate_content(prompt)
            return self._parse_response(response.text, difficulty)
        except Exception as e:
            logger.error(f"Question generation error: {str(e)}")
            return None

    def _create_prompt(self, difficulty, subject):
        return f"""Generate a {difficulty} level multiple-choice question for {subject}.

        Format:
        Q: [Question text]
        A) [Option 1]
        B) [Option 2]
        C) [Option 3]
        D) [Option 4]
        CORRECT: [Correct Option Letter]
        """

    def _parse_response(self, content, difficulty):
        lines = content.split('\n')
        question_text = lines[0].replace('Q: ', '').strip()
        
        options = {}
        correct_option = None
        
        for line in lines[1:]:
            if line.startswith(('A)', 'B)', 'C)', 'D)')):
                key = line[0]
                options[key] = line[3:].strip()
            elif line.startswith('CORRECT:'):
                correct_option = line.replace('CORRECT:', '').strip()
        
        if not all([question_text, options, correct_option]):
            return None
        
        return {
            'text': question_text,
            'difficulty': difficulty,
            'option1': options.get('A', ''),
            'option2': options.get('B', ''),
            'option3': options.get('C', ''),
            'option4': options.get('D', ''),
            'correct_option': options.get(correct_option, '')
        }