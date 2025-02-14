import streamlit as st
from transformers import BartForConditionalGeneration, BartTokenizer
from PyPDF2 import PdfReader
from docx import Document
import re
import torch

class DocumentSummarizer:
    def _init_(self, model_name="facebook/bart-large-cnn"):
        """
        Initialize the summarization model
        """
        self.model = BartForConditionalGeneration.from_pretrained(model_name)
        self.tokenizer = BartTokenizer.from_pretrained(model_name)
    
    def extract_text_from_pdf(self, file):
        """
        Extract text from PDF file
        """
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text

    def extract_text_from_docx(self, file):
        """
        Extract text from Word document
        """
        doc = Document(file)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text

    def preprocess_text(self, text):
        """
        Clean and preprocess text
        """
        text = re.sub(r"[^\w\s.,]", "", text)  # Keep words, spaces, dots, and commas
        text = re.sub(r"\s+", " ", text)  # Replace multiple spaces with a single space
        return text.strip()

    def summarize_text(self, text, min_length, max_length):
        """
        Generate summary using BART model
        """
        # Truncate input to model's maximum context length
        inputs = self.tokenizer(text, max_length=1024, truncation=True, return_tensors="pt")
        
        # Generate summary
        summary_ids = self.model.generate(
            inputs.input_ids,
            min_length=min_length,
            max_length=max_length,
            length_penalty=2.0,
            num_beams=4,
            early_stopping=True
        )
        
        return self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)

def main():
    # Set page configuration
    st.set_page_config(
        page_title="Document Summarization AI",
        page_icon="📄",
        layout="wide"
    )

    # Title and description
    st.title("📄 Document Summarization AI")
    st.markdown("""
    ### Summarize PDF and DOCX files with AI
    - Upload multiple documents
    - Customize summary length
    - Get concise summaries instantly
    """)

    # Initialize summarizer
    summarizer = DocumentSummarizer()

    # Sidebar for configuration
    st.sidebar.header("📝 Summary Settings")
    
    # Length control
    min_length = st.sidebar.slider(
        "Minimum Summary Length", 
        min_value=50, 
        max_value=200, 
        value=100
    )
    max_length = st.sidebar.slider(
        "Maximum Summary Length", 
        min_value=100, 
        max_value=500, 
        value=300
    )

    # File uploader
    uploaded_files = st.file_uploader(
        "Upload PDF or DOCX files", 
        type=['pdf', 'docx'], 
        accept_multiple_files=True
    )

    # Process and summarize
    if uploaded_files:
        # Container for results
        results_container = st.container()
        
        with results_container:
            # Spinner for processing
            with st.spinner('Processing documents...'):
                # Combine text from all uploaded files
                combined_text = ""
                
                # Track file processing
                processed_files = []
                
                # Extract text from files
                for uploaded_file in uploaded_files:
                    try:
                        if uploaded_file.name.endswith('.pdf'):
                            text = summarizer.extract_text_from_pdf(uploaded_file)
                        elif uploaded_file.name.endswith('.docx'):
                            text = summarizer.extract_text_from_docx(uploaded_file)
                        else:
                            st.error(f"Unsupported file type: {uploaded_file.name}")
                            continue
                        
                        combined_text += text + "\n\n"
                        processed_files.append(uploaded_file.name)
                    except Exception as e:
                        st.error(f"Error processing {uploaded_file.name}: {e}")

                # Validate text length
                if len(combined_text.split()) > 50:
                    # Preprocess text
                    cleaned_text = summarizer.preprocess_text(combined_text)
                    
                    # Generate summary
                    summary = summarizer.summarize_text(
                        cleaned_text, 
                        min_length, 
                        max_length
                    )
                    
                    # Display results
                    st.success(f"Processed {len(processed_files)} file(s)")
                    
                    # Expanders for detailed view
                    with st.expander("📋 Summary"):
                        st.write(summary)
                    
                    with st.expander("📄 Original Text"):
                        st.text(cleaned_text)
                else:
                    st.warning("The extracted text is too short for summarization.")
    else:
        # Informative message when no files are uploaded
        st.info("👉 Upload PDF or DOCX files to generate summaries")

    # Additional information
    st.sidebar.markdown("---")
    st.sidebar.info("""
    ### How to Use
    1. Upload PDF or DOCX files
    2. Adjust summary length using sliders
    3. Click 'Browse files' to select documents
    4. View generated summary
    """)

if _name_ == "_main_":
    main()
