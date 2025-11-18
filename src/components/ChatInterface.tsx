import React, { useState, useRef } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      autoResize();
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    autoResize();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div className="flex-1 flex items-center space-x-3">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          rows={1}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:opacity-50 transition-all duration-200 bg-white
                     resize-none overflow-hidden"
        ></textarea>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!message.trim() || isLoading}
        className="px-3 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span className="font-medium">Send</span>
      </button>
    </div>
  );
};

export default ChatInterface;
