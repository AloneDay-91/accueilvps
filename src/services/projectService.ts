import { ProjectItem } from '@/types/projects';
import { buildApiUrl } from '@/config/api';

export interface CreateProjectData {
  semestre: string;
  title: string;
  description: string;
  content: {
    [key: string]: {
      title: string;
      description: string;
      link?: string;
      links?: string[];
    };
  };
}

// Type alias pour UpdateProjectData (même structure que CreateProjectData)
export type UpdateProjectData = CreateProjectData;

class ProjectService {
  private baseUrl = buildApiUrl('/projects');

  // Test de connectivité au backend
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Test de connectivité au backend...');
      const healthUrl = buildApiUrl('/health');
      console.log('🔗 URL de santé:', healthUrl);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Réponse du test de connectivité:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend accessible:', data);
        return true;
      } else {
        console.error('❌ Backend non accessible:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur de connectivité:', error);
      return false;
    }
  }

  // Récupérer tous les projets (route publique, sans authentification)
  async getPublicProjects(): Promise<ProjectItem[]> {
    try {
      console.log('🔍 ProjectService: Début de getPublicProjects');
      const publicUrl = buildApiUrl('/projects/public');
      console.log('🔗 URL publique:', publicUrl);
      
      // Test de connectivité d'abord
      const isConnected = await this.testConnection();
      if (!isConnected) {
        throw new Error('Impossible de se connecter au backend');
      }
      
      const response = await fetch(publicUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 ProjectService: Réponse publique reçue', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ ProjectService: Erreur HTTP publique', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        
        throw new Error(`Erreur lors de la récupération des projets: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ ProjectService: Données publiques reçues', {
        itemsCount: data.items?.length || 0,
        data: data
      });
      
      return data.items || [];
    } catch (error) {
      console.error('❌ Erreur ProjectService.getPublicProjects:', error);
      throw error;
    }
  }

  // Récupérer tous les projets (route protégée, avec authentification)
  async getAllProjects(): Promise<ProjectItem[]> {
    try {
      console.log('🔍 ProjectService: Début de getAllProjects');
      console.log('🔗 URL:', this.baseUrl);
      console.log('🔑 Token présent:', !!localStorage.getItem('authToken'));
      
      // Test de connectivité d'abord
      const isConnected = await this.testConnection();
      if (!isConnected) {
        throw new Error('Impossible de se connecter au backend');
      }
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }
      
      const response = await fetch(this.baseUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 ProjectService: Réponse reçue', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ ProjectService: Erreur HTTP', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        
        // Gestion spécifique des erreurs
        if (response.status === 401) {
          throw new Error('Token d\'authentification invalide');
        } else if (response.status === 500) {
          throw new Error('Erreur serveur - Vérifiez les logs du backend');
        } else {
          throw new Error(`Erreur lors de la récupération des projets: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log('✅ ProjectService: Données reçues', {
        itemsCount: data.items?.length || 0,
        data: data
      });
      
      return data.items || [];
    } catch (error) {
      console.error('❌ Erreur ProjectService.getAllProjects:', error);
      throw error;
    }
  }

  // Récupérer un projet par ID
  async getProjectById(id: string): Promise<ProjectItem | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Erreur lors de la récupération du projet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur ProjectService.getProjectById:', error);
      throw error;
    }
  }

  // Créer un nouveau projet
  async createProject(projectData: CreateProjectData): Promise<ProjectItem> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du projet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur ProjectService.createProject:', error);
      throw error;
    }
  }

  // Mettre à jour un projet
  async updateProject(id: string, projectData: UpdateProjectData): Promise<ProjectItem> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du projet');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur ProjectService.updateProject:', error);
      throw error;
    }
  }

  // Supprimer un projet
  async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du projet');
      }
    } catch (error) {
      console.error('Erreur ProjectService.deleteProject:', error);
      throw error;
    }
  }

  // Générer un ID unique pour un nouveau projet
  generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `r${timestamp}${randomStr}`;
  }

  // Valider les données d'un projet
  validateProjectData(data: CreateProjectData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.semestre?.trim()) {
      errors.push('Le semestre est requis');
    }

    if (!data.title?.trim()) {
      errors.push('Le titre est requis');
    }

    if (!data.description?.trim()) {
      errors.push('La description est requise');
    }

    if (!data.content || Object.keys(data.content).length === 0) {
      errors.push('Au moins un projet est requis');
    }

    // Valider chaque projet dans le content
    Object.entries(data.content).forEach(([key, project]) => {
      if (!project.title?.trim()) {
        errors.push(`Le titre du projet ${key} est requis`);
      }
      if (!project.description?.trim()) {
        errors.push(`La description du projet ${key} est requise`);
      }
      if (!project.link && (!project.links || project.links.length === 0)) {
        errors.push(`Le projet ${key} doit avoir au moins un lien`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const projectService = new ProjectService(); 