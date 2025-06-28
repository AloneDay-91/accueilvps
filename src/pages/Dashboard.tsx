import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Activity,
  Database,
  Server,
  FolderOpen,
  Eye,
  Clock,
  RefreshCw,
  Globe,
  Edit
} from 'lucide-react';
import Layout from "@/components/Layout";
import { GridPatternCard, GridPatternCardBody } from "@/components/ui/card-with-grid-ellipsis-pattern";
import { ProjectManager } from '@/components/ProjectManager';
import { projectService } from '@/services/projectService';
import { analyticsService, AnalyticsOverview, SystemStatus } from '@/services/analyticsService';
import { ProjectItem } from '@/types/projects';

type DashboardTab = 'overview' | 'projects';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Données analytiques réelles
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

  // Charger toutes les données
  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Début du chargement des données...');
      console.log('🔑 Token dans localStorage:', localStorage.getItem('authToken') ? 'Présent' : 'Absent');
      console.log('👤 Utilisateur connecté:', user);
      
      // Charger les projets et les analytics en parallèle
      console.log('📡 Chargement des projets...');
      const projectsData = await projectService.getAllProjects();
      console.log('✅ Projets chargés:', projectsData.length, 'projets');
      
      console.log('📊 Chargement des analytics...');
      const analyticsData = await analyticsService.getAllAnalytics();
      console.log('✅ Analytics chargés:', analyticsData);
      
      setProjects(projectsData);
      setOverview(analyticsData.overview);
      setSystemStatus(analyticsData.systemStatus);
      
      console.log('🎉 Toutes les données chargées avec succès !');
      
    } catch (err) {
      console.error('❌ Erreur lors du chargement des données:', err);
      console.error('🔍 Détails de l\'erreur:', {
        message: err instanceof Error ? err.message : 'Erreur inconnue',
        stack: err instanceof Error ? err.stack : undefined,
        type: typeof err
      });
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Actualiser les données
  const refreshData = async () => {
    await loadAllData();
  };

  useEffect(() => {
    loadAllData();
    
    // Actualiser les données toutes les 5 minutes
    const interval = setInterval(loadAllData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En ligne': return 'text-green-500 border-green-500 bg-green-600/30';
      case 'Attention': return 'text-yellow-400 border-yellow-400 bg-yellow-600/30';
      case 'Hors ligne': return 'text-red-400 border-red-400 bg-red-600/30';
      default: return 'text-gray-400 border-gray-400 bg-gray-600/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En ligne': return;
      case 'Attention': return;
      case 'Hors ligne': return;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Chargement des données...</span>
          </div>
        </div>
      </Layout>
    );
  }

  const renderOverviewTab = () => (
    <>
      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <Card variant="plus" className="bg-background mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Statistiques en temps réel</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className=" w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Projets totaux
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                  {overview?.totalProjects || 0}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {overview?.averageProjectsPerSemester || 0} par semestre
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Visites aujourd'hui
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                  {visitStats?.visitsToday || 0}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {visitStats && getTrendIcon(visitStats.trend)}
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {visitStats?.trend === 'up' ? '+' : '-'}{visitStats?.trendPercentage || 0}% vs hier
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div> */}

            {/* <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Visites ce mois
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                  {(visitStats?.visitsThisMonth || 0).toLocaleString()}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  Total: {(visitStats?.totalVisits || 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
            </div> */}

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Semestre actif
                </p>
                <p className="text-lg font-bold text-orange-900 dark:text-orange-100 mt-1">
                  {overview?.mostActiveSemester || 'Aucun'}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  Le plus populaire
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Statut système */}
        <Card variant="plus" className="lg:col-span-2 bg-background">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Statut système</h2>
            <div className="space-y-4">
              <Card variant="inner">
                <div className='flex flex-row items-center justify-between'>
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Base de données</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(systemStatus?.database || 'offline')}>
                    {getStatusIcon(systemStatus?.database || 'offline')}
                    <span className="ml-1 capitalize">{systemStatus?.database || 'offline'}</span>
                  </Badge>
                </div>
              </Card>
              
              <Card variant='inner'>
                <div className='flex flex-row items-center justify-between'>
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Serveur API</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(systemStatus?.server || 'offline')}>
                    {getStatusIcon(systemStatus?.server || 'offline')}
                    <span className="ml-1 capitalize">{systemStatus?.server || 'offline'}</span>
                  </Badge>
                  </div>
              </Card>
              
              <Card variant='inner'>
              <div className='flex flex-row items-center justify-between'>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">API Frontend</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(systemStatus?.api || 'offline')}>
                    {getStatusIcon(systemStatus?.api || 'offline')}
                    <span className="ml-1 capitalize">{systemStatus?.api || 'offline'}</span>
                  </Badge>
              </div>
              </Card>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card variant='inner'>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">CPU</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{systemStatus?.cpuUsage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemStatus?.cpuUsage || 0}%` }}
                    ></div>
                  </div>
                </Card>
                
                <Card variant='inner'>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Mémoire</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{systemStatus?.memoryUsage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${systemStatus?.memoryUsage || 0}%` }}
                    ></div>
                  </div>
                </Card>
              </div>

              <Card variant='inner'>
                <div className='flex flex-row items-center justify-between'>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Uptime</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {systemStatus?.uptime || 'Inconnu'}
                  </span>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projets récents */}
      <Card variant="plus" className="bg-background mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Projets récents</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveTab('projects')}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Voir tous
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {projects.slice(0, 6).map((project) => (
              <div key={project.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm truncate">{project.title}</h3>
                  <Badge variant="outline" className="text-xs">{project.semestre}</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{Object.keys(project.content).length} projet(s)</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveTab('projects')}
                    className="h-6 px-2 text-xs"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      {/* <Card variant="plus" className="bg-background mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Sauvegarder
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Voir les logs
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setActiveTab('projects')}
            >
              <FolderOpen className="w-4 h-4" />
              Gérer les projets
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Voir le site
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={refreshData}>
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </>
  );

  const renderProjectsTab = () => (
    <div className="mt-6">
      <ProjectManager 
        onProjectsChange={() => {
          loadAllData();
        }}
      />
    </div>
  );

  return (
    <Layout>
      <GridPatternCard>
        <GridPatternCardBody>
          <Badge variant="outline" className="mb-1 text-[9px]">
            <span
              className="size-1.5 rounded-full bg-blue-500 mr-2"
              aria-hidden="true"
            ></span>
            Dashboard
          </Badge>
          <h3 className="text-lg font-bold mb-1 text-foreground">
            Tableau de bord administrateur
          </h3>
          <p className="text-wrap text-sm text-foreground/60">
            Bienvenue, {user?.name} ! Voici un aperçu de votre système et des statistiques importantes.
          </p>
        </GridPatternCardBody>
      </GridPatternCard>

      {/* Onglets */}
      <Card variant="plus" className="bg-background mt-6">
        <CardContent className="p-6">
          <div className="flex space-x-1 mb-6">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Vue d'ensemble
            </Button>
            <Button
              variant={activeTab === 'projects' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('projects')}
              className="flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Gestion des projets
            </Button>
          </div>

          {/* Contenu des onglets */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'projects' && renderProjectsTab()}
        </CardContent>
      </Card>
    </Layout>
  );
}; 