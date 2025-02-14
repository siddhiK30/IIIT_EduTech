import React, { useState, useEffect, useRef } from 'react';
import Bot from '../../assests/Bot.jpg';
import { FiPaperclip, FiMic, FiSend } from 'react-icons/fi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

const genAI = new GoogleGenerativeAI("AIzaSyApZd8uGx6WJ0EGHEf9xelRoMaSojFrycg");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [fileProcessing, setFileProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(inputMessage);
        const response = await result.response;
        
        setMessages(prev => [...prev, { 
          text: response.text(), 
          sender: 'bot' 
        }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, {
          text: "Sorry, I couldn't process your request.",
          sender: 'bot',
          error: true
        }]);
      }
    }
  };

  // Function to process file and get Gemini response
  const processFileAndGetResponse = async (extractedText, filename) => {
    try {
      const prompt = `I have extracted text from the file "${filename}". 
                     Please analyze this text and provide a clear summary: 
                     ${extractedText}`;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error processing with Gemini:', error);
      throw error;
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setMessages(prev => [...prev, {
        text: "File size too large. Please upload a file smaller than 10MB.",
        sender: 'bot',
        error: true
      }]);
      return;
    }

    const allowedTypes = ['.pdf', '.docx', '.txt'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!allowedTypes.includes(fileExtension)) {
      setMessages(prev => [...prev, {
        text: "Unsupported file type. Please upload PDF, DOCX, or TXT files.",
        sender: 'bot',
        error: true
      }]);
      return;
    }

    setFileProcessing(true);
    setMessages(prev => [...prev, {
      text: `Processing file: ${file.name}...`,
      sender: 'bot'
    }]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'http://127.0.0.1:8000/bot/process-file/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      const { text: extractedText } = response.data;

      setMessages(prev => [...prev, {
        text: `Uploaded file: ${file.name}`,
        sender: 'user',
        isFile: true
      }]);

      const geminiResponse = await processFileAndGetResponse(extractedText, file.name);

      setMessages(prev => [...prev, {
        text: geminiResponse,
        sender: 'bot'
      }]);

    } catch (error) {
      console.error('Error processing file:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error processing your file. Please try again.",
        sender: 'bot',
        error: true
      }]);
    } finally {
      setFileProcessing(false);
    }
  };

  // Modified render for file upload button
  const renderFileUploadButton = () => (
    <label className={`cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors duration-200 
      ${fileProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <FiPaperclip className='w-6 h-6 text-gray-500' />
      <input 
        type="file" 
        className='hidden' 
        onChange={handleFileUpload}
        disabled={fileProcessing}
        accept=".pdf,.docx,.txt"
      />
    </label>
  );

  // Modified message display to show file uploads differently
  const renderMessage = (message, index) => (
    <div 
      key={index} 
      className={`flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {message.sender === 'bot' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mr-2">
          <img src={Bot} alt="Bot" className="w-full h-full object-cover" />
        </div>
      )}
      <div 
        className={`max-w-[70%] p-3 rounded-lg ${
          message.sender === 'user' 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        } ${message.error ? 'bg-red-100 text-red-600' : ''} 
          ${message.isFile ? 'bg-green-100 text-green-600' : ''}`}
      >
        {message.text}
      </div>
    </div>
  );

  return (
    <div className='flex justify-center h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-2xl h-[90vh] border rounded-2xl bg-white shadow-lg'>
        {/* Header */}
        <div className='w-full h-[80px] bg-gray-100 rounded-t-2xl py-2 px-5 flex items-center border-b'>
          <img 
            className="w-12 h-12 rounded-full ring-2 ring-gray-300" 
            src={Bot} 
            alt="Bot avatar" 
          />
          <div className='ml-3'>
            <h3 className='font-semibold text-lg'>AI Assistant</h3>
            <p className='text-sm text-gray-500'>
              {fileProcessing ? 'Processing...' : 'Online'}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className='h-[calc(90vh-160px)] overflow-y-auto p-4'>
          {messages.map((message, index) => renderMessage(message, index))}
        </div>

        {/* Input Area */}
        <div className='h-[80px] border-t p-4'>
          <div className='flex items-center gap-2'>
            {renderFileUploadButton()}
            
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className='flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500'
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={fileProcessing}
            />

            <button 
              className={`p-2 rounded-full hover:bg-gray-100 ${isRecording ? 'text-red-500' : 'text-gray-500'}`}
              onClick={() => setIsRecording(!isRecording)}
              disabled={fileProcessing}
            >
              <FiMic className='w-6 h-6' />
            </button>

            <button 
              className='p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300'
              onClick={handleSendMessage}
              disabled={fileProcessing || !inputMessage.trim()}
            >
              <FiSend className='w-6 h-6' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;