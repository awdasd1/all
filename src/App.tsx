import React from 'react';
import { ChatContainer } from './components/ChatContainer';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col h-screen bg-gray-900">
          <div className="p-4 bg-gray-800 flex justify-end">
            <button
              onClick={logout}
              className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <ChatContainer />
        </div>
      ) : (
        <LoginForm onLogin={login} />
      )}
    </>
  );
}

export default App;
