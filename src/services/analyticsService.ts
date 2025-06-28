import { buildApiUrl } from '@/config/api';

export interface AnalyticsOverview {
  totalProjects: number;
  totalSubProjects: number;
  projectsWithLinks: number;
  averageProjectsPerSemester: number;
  mostActiveSemester: string;
  semesterBreakdown: Record<string, number>;
  latestProject: {
    id: string;
    title: string;
    semestre: string;
    createdAt: string;
  } | null;
  lastUpdated: string;
}

export interface SystemStatus {
  database: 'online' | 'offline' | 'warning';
  server: 'online' | 'offline' | 'warning';
  api: 'online' | 'offline' | 'warning';
  memoryUsage: number;
  cpuUsage: number;
  uptime: string;
  lastBackup: string;
  timestamp: string;
}

export interface VisitStats {
  visitsToday: number;
  visitsYesterday: number;
  visitsThisWeek: number;
  visitsThisMonth: number;
  totalVisits: number;
  trend: 'up' | 'down';
  trendPercentage: number;
  averageVisitsPerProject: number;
  timestamp: string;
}

export interface RecentActivity {
  action: string;
  user: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
  projectId?: string;
  timestamp: string;
}

export interface AnalyticsActivity {
  activities: RecentActivity[];
  totalActivities: number;
  timestamp: string;
}

class AnalyticsService {
  private baseUrl = buildApiUrl('/analytics');

  // Récupérer les statistiques générales
  async getOverview(): Promise<AnalyticsOverview> {
    try {
      console.log('🔍 AnalyticsService: Début de getOverview');
      console.log('🔗 URL:', `${this.baseUrl}/overview`);
      console.log('🔑 Token présent:', !!localStorage.getItem('authToken'));
      
      const response = await fetch(`${this.baseUrl}/overview`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 AnalyticsService: Réponse reçue pour overview', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AnalyticsService: Erreur HTTP pour overview', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erreur lors de la récupération des statistiques: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ AnalyticsService: Overview reçu', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur AnalyticsService.getOverview:', error);
      throw error;
    }
  }

  // Récupérer le statut système
  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/system-status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du statut système');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur AnalyticsService.getSystemStatus:', error);
      throw error;
    }
  }

  // Récupérer les statistiques de visite
  async getVisitStats(): Promise<VisitStats> {
    try {
      const response = await fetch(`${this.baseUrl}/visit-stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques de visite');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur AnalyticsService.getVisitStats:', error);
      throw error;
    }
  }

  // Récupérer les activités récentes
  async getRecentActivity(): Promise<AnalyticsActivity> {
    try {
      const response = await fetch(`${this.baseUrl}/recent-activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des activités récentes');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur AnalyticsService.getRecentActivity:', error);
      throw error;
    }
  }

  // Récupérer toutes les données analytiques en une seule fois
  async getAllAnalytics() {
    try {
      const [overview, systemStatus, visitStats, recentActivity] = await Promise.all([
        this.getOverview(),
        this.getSystemStatus(),
        this.getVisitStats(),
        this.getRecentActivity()
      ]);

      return {
        overview,
        systemStatus,
        visitStats,
        recentActivity
      };
    } catch (error) {
      console.error('Erreur AnalyticsService.getAllAnalytics:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService(); 