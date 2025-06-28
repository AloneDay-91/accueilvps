import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginForm } from './LoginForm';
import { Dashboard } from '@/pages/Dashboard';
import { HomePage } from '@/pages/HomePage';

// Composant principal de routage
export const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Récupérer le chemin actuel
  const path = window.location.pathname;

  // Redirection automatique si l'utilisateur est connecté
  useEffect(() => {
    if (!isLoading && isAuthenticated && path === '/login') {
      console.log('🔄 AppRouter: Redirection automatique vers le dashboard depuis login');
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated, isLoading, path]);

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Routage simple basé sur le pathname
  switch (path) {
    case '/dashboard':
      return (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      );
    
    case '/login':
      return isAuthenticated ? <Dashboard /> : <LoginForm />;
    
    default:
      return <HomePage />;
  }
}; 