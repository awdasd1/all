import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => string;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = onLogin(username, password);
    setError(errorMessage);
    if (!errorMessage) {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-600 rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Secure Login
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm py-2">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 flex items-center justify-center space-x-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}