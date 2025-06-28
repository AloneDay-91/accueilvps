import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Si l'utilisateur doit être admin mais ne l'est pas
  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900 dark:to-pink-900 p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Accès refusé
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Rôle requis : Admin | Votre rôle : {user?.role}
          </p>
        </div>
      </div>
    );
  }

  // Si tout est OK, afficher le contenu protégé
  return <>{children}</>;
}; 