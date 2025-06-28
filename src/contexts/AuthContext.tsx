import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_CONFIG, buildApiUrl } from '@/config/api';

// Types pour l'authentification
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider du contexte
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      console.log('🔍 AuthContext: Vérification de l\'authentification');
      console.log('🔑 Token trouvé:', !!token);
      
      if (token) {
        verifyToken(token);
      } else {
        console.log('❌ AuthContext: Aucun token trouvé');
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Vérifier la validité du token
  const verifyToken = async (tokenToVerify: string) => {
    try {
      console.log('🔍 AuthContext: Vérification du token côté serveur');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.VERIFY), {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
          ...API_CONFIG.REQUEST_CONFIG.headers,
        },
      });

      console.log('📡 AuthContext: Réponse de vérification', {
        status: response.status,
        ok: response.ok
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(tokenToVerify);
        setIsAuthenticated(true);
        console.log('✅ AuthContext: Token valide, utilisateur connecté', data.user);
      } else {
        console.log('❌ AuthContext: Token invalide côté serveur');
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('❌ AuthContext: Erreur lors de la vérification du token', error);
      localStorage.removeItem('authToken');
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNIN), {
        method: 'POST',
        headers: API_CONFIG.REQUEST_CONFIG.headers,
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Erreur de connexion:', errorData.error);
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}; 