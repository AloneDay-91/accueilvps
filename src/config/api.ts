// Configuration de l'API
export const API_CONFIG = {
  // URL de l'API backend - en développement, utilise localhost, en production utilise l'URL de Vercel
  BASE_URL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : 'https://backend-vps.vercel.app'),
  
  // Endpoints de l'API
  ENDPOINTS: {
    AUTH: {
      SIGNIN: '/auth/signin',
      SIGNOUT: '/auth/signout',
      VERIFY: '/auth/verify',
      REFRESH: '/auth/refresh',
    },
  },
  
  // Configuration des requêtes
  REQUEST_CONFIG: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

// Log de la configuration pour le diagnostic
console.log('🔧 Configuration API:', {
  BASE_URL: API_CONFIG.BASE_URL,
  DEV: import.meta.env.DEV,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  NODE_ENV: import.meta.env.NODE_ENV
});

// Fonction utilitaire pour construire l'URL complète
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/') 
    ? API_CONFIG.BASE_URL.slice(0, -1) 
    : API_CONFIG.BASE_URL;
  
  const cleanEndpoint = endpoint.startsWith('/') 
    ? endpoint 
    : `/${endpoint}`;
  
  const fullUrl = `${baseUrl}${cleanEndpoint}`;
  console.log('🔗 URL construite:', fullUrl);
  
  return fullUrl;
}; 