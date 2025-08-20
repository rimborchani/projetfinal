'use client';

import { useEffect } from 'react';

export default function ChatStage() {
  useEffect(() => {
    // Initialize chat stage
    console.log('Chat stage initialized');
  }, []);

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            شات تفاعلي
          </span>
          <span id="username-display" className="text-xs text-gray-500 dark:text-gray-400">
            المستخدم
          </span>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500">
          متصل الآن
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        id="chat-container" 
        className="h-80 overflow-y-auto mb-4 space-y-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
      >
        <div className="message system">
          <div className="message-bubble system-bubble text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 mx-auto w-fit">
            📱 مرحبا بك في الشات التفاعلي!
          </div>
        </div>
      </div>

      {/* Chat Input (for demonstration) */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm text-gray-400">
          استخدم البلوكات لإرسال الرسائل...
        </div>
        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .message {
          margin-bottom: 8px;
        }
        
        .message-bubble {
          max-width: 80%;
          padding: 8px 12px;
          border-radius: 18px;
          position: relative;
        }
        
        .message.sent .message-bubble {
          background-color: #007bff;
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 6px;
        }
        
        .message.reply .message-bubble {
          background-color: #28a745;
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 6px;
        }
        
        .message.reply .reply-to {
          font-size: 11px;
          opacity: 0.8;
          border-left: 2px solid rgba(255,255,255,0.5);
          padding-left: 8px;
          margin-bottom: 4px;
        }
        
        .message.system .message-bubble,
        .system-bubble {
          background-color: #6c757d;
          color: white;
          text-align: center;
          margin: 0 auto;
          font-size: 12px;
        }
        
        .message.emoji .message-bubble {
          background-color: #ffc107;
          color: #212529;
          text-align: center;
          margin-left: auto;
        }
        
        .emoji-large {
          font-size: 24px;
          display: block;
          margin-bottom: 4px;
        }
        
        .username {
          font-weight: 600;
          font-size: 11px;
          display: block;
          margin-bottom: 2px;
        }
        
        .text {
          display: block;
          line-height: 1.4;
        }
        
        .time {
          font-size: 10px;
          opacity: 0.7;
          display: block;
          margin-top: 2px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
