export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ContentType {
  id: string;
  name: string;
  category: ContentCategory;
  description: string;
}

export type ContentCategory = 'professional' | 'marketing' | 'social' | 'educational';

export interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  contentType: ContentType;
  createdAt: string;
  prompt: string;
}