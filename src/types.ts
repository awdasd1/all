export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface LoginAttempt {
  timestamp: Date;
  successful: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  attempts: LoginAttempt[];
  lockedUntil: Date | null;
}