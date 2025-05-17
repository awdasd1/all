import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface MessageDisplayProps {
  messages: Message[];
}

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-indigo-300 hover:text-indigo-200 underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  code: ({ children }) => (
    <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-800 p-3 rounded-lg overflow-x-auto mb-2 font-mono text-sm">{children}</pre>
  ),
  h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-md font-bold mb-2">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-600 pl-4 italic my-2">{children}</blockquote>
  ),
};

export function MessageDisplay({ messages }: MessageDisplayProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.isUser
                ? 'bg-indigo-600 text-white prose prose-invert'
                : 'bg-gray-700 text-gray-100 prose prose-invert'
            }`}
          >
            <ReactMarkdown
              className="text-sm"
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {message.content}
            </ReactMarkdown>
            <p className="text-xs opacity-50 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}