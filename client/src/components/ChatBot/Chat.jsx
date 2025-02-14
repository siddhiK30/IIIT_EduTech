import React, { useState } from 'react';
import Bot from '../../assests/Bot.jpg';
import { FiPaperclip, FiMic, FiSend } from 'react-icons/fi'; // Make sure to install react-icons

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

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
            <p className='text-sm text-gray-500'>Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className='h-[calc(90vh-160px)] overflow-y-auto p-4'>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className='h-[80px] border-t p-4'>
          <div className='flex items-center gap-2'>
            {/* File Input */}
            <label className='cursor-pointer hover:bg-gray-100 p-2 rounded-full'>
              <FiPaperclip className='w-6 h-6 text-gray-500' />
              <input 
                type="file" 
                className='hidden' 
                onChange={(e) => console.log(e.target.files[0])}
              />
            </label>

            {/* Text Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className='flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500'
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />

            {/* Audio Input */}
            <button 
              className={`p-2 rounded-full hover:bg-gray-100 ${isRecording ? 'text-red-500' : 'text-gray-500'}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <FiMic className='w-6 h-6' />
            </button>

            {/* Send Button */}
            <button 
              className='p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white'
              onClick={handleSendMessage}
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