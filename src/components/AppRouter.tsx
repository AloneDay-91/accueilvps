import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginForm } from './LoginForm';
import { Dashboard } from '@/pages/Dashboard';
import { HomePage } from '@/pages/HomePage';

// Composant principal de routage
export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Récupérer le chemin actuel
  const path = window.location.pathname;

  // Routage simple basé sur le pathname
  switch (path) {
    case '/dashboard':
      return (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      );
    
    case '/login':
      return isAuthenticated ? <HomePage /> : <LoginForm />;
    
    default:
      return <HomePage />;
  }
}; 