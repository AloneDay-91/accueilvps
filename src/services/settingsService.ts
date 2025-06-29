import { buildApiUrl } from '@/config/api';

export interface Settings {
  id: string;
  showPubModal: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSettingsData {
  showPubModal?: boolean;
}

class SettingsService {
  // Récupérer les paramètres
  async getSettings(): Promise<Settings> {
    try {
      const url = buildApiUrl('/settings');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      throw error;
    }
  }

  // Mettre à jour les paramètres
  async updateSettings(data: UpdateSettingsData): Promise<Settings> {
    try {
      const url = buildApiUrl('/settings');
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      throw error;
    }
  }

  // Basculer l'affichage de la modal de pub
  async togglePubModal(): Promise<Settings> {
    try {
      const url = buildApiUrl('/settings/toggle-pub-modal');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors du basculement de la modal de pub:', error);
      throw error;
    }
  }
}

export const settingsService = new SettingsService(); 