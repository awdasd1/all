import { useState, useCallback, useMemo } from 'react';
import { AuthState, LoginAttempt } from '../types';

const LOCK_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
const MAX_ATTEMPTS = 3;

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    attempts: [],
    lockedUntil: null,
  });

  const isLocked = useMemo(() => {
    if (!authState.lockedUntil) return false;
    return new Date() < authState.lockedUntil;
  }, [authState.lockedUntil]);

  const recentAttempts = useMemo(() => {
    const now = new Date();
    return authState.attempts.filter(
      attempt => 
        !attempt.successful && 
        now.getTime() - attempt.timestamp.getTime() < LOCK_DURATION
    );
  }, [authState.attempts]);

  const login = useCallback((username: string, password: string): string => {
    if (isLocked) {
      const timeLeft = Math.ceil((authState.lockedUntil!.getTime() - new Date().getTime()) / 60000);
      return `Account is locked. Try again in ${timeLeft} minutes.`;
    }

    if (recentAttempts.length >= MAX_ATTEMPTS) {
      const lockUntil = new Date(Date.now() + LOCK_DURATION);
      setAuthState(prev => ({
        ...prev,
        lockedUntil: lockUntil,
      }));
      return `Maximum login attempts exceeded. Account locked for 30 minutes.`;
    }

    const attempt: LoginAttempt = {
      timestamp: new Date(),
      successful: false,
    };

    if (
      username === import.meta.env.VITE_AUTH_USERNAME &&
      password === import.meta.env.VITE_AUTH_PASSWORD
    ) {
      attempt.successful = true;
      setAuthState(prev => ({
        isAuthenticated: true,
        attempts: [...prev.attempts, attempt],
        lockedUntil: null,
      }));
      return '';
    }

    setAuthState(prev => ({
      ...prev,
      attempts: [...prev.attempts, attempt],
    }));
    
    const remainingAttempts = MAX_ATTEMPTS - (recentAttempts.length + 1);
    return `Invalid credentials. ${remainingAttempts} attempts remaining.`;
  }, [isLocked, recentAttempts]);

  const logout = useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: false,
    }));
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    isLocked,
    login,
    logout,
  };
}