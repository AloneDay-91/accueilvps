import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProgressToast } from '@/contexts/ProgressToastContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { ProjectItem } from '@/types/projects';
import { projectService, CreateProjectData } from '@/services/projectService';

interface ProjectManagerProps {
  onProjectsChange?: () => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({ onProjectsChange }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showContent, setShowContent] = useState<{ [key: string]: boolean }>({});
  
  // États pour la confirmation de suppression
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectItem | null>(null);

  // Hook pour les toasts avec barre de progression
  const { success, error: showError } = useProgressToast();

  // Charger les projets
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Erreur lors du chargement des projets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Créer un nouveau projet
  const handleCreate = () => {
    const newProject: CreateProjectData = {
      semestre: '',
      title: '',
      description: '',
      content: {
        project1: {
          title: '',
          description: '',
          link: ''
        }
      }
    };
    setEditingProject({
      id: projectService.generateId(),
      ...newProject
    });
    setIsCreating(true);
  };

  // Éditer un projet existant
  const handleEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setIsCreating(false);
  };

  // Supprimer un projet
  const handleDelete = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      await loadProjects();
      onProjectsChange?.();
      success("Projet supprimé avec succès");
    } catch (err) {
      const errorMessage = 'Erreur lors de la suppression';
      setError(errorMessage);
      showError(errorMessage);
      console.error(err);
    }
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    await handleDelete(projectToDelete.id);
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  // Sauvegarder un projet
  const handleSave = async () => {
    if (!editingProject) return;

    console.log('💾 handleSave appelé, isCreating:', isCreating);

    try {
      const validation = projectService.validateProjectData(editingProject);
      if (!validation.isValid) {
        const errorMessage = validation.errors.join(', ');
        setError(errorMessage);
        showError(errorMessage);
        return;
      }

      if (isCreating) {
        console.log('💾 Création du projet...');
        await projectService.createProject(editingProject);
        console.log('💾 Projet créé, appel de success()');
        success("Projet créé avec succès");
      } else {
        console.log('💾 Modification du projet...');
        await projectService.updateProject(editingProject.id, editingProject);
        console.log('💾 Projet modifié, appel de success()');
        success("Projet modifié avec succès");
      }

      setEditingProject(null);
      setIsCreating(false);
      await loadProjects();
      onProjectsChange?.();
      setError(null);
    } catch (err) {
      const errorMessage = 'Erreur lors de la sauvegarde';
      setError(errorMessage);
      showError(errorMessage);
      console.error(err);
    }
  };

  // Annuler l'édition
  const handleCancel = () => {
    setEditingProject(null);
    setIsCreating(false);
    setError(null);
  };

  // Mettre à jour un champ du projet en cours d'édition
  const updateEditingProject = (field: string, value: string) => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, [field]: value });
  };

  // Mettre à jour un projet dans le content
  const updateProjectContent = (projectKey: string, field: string, value: string) => {
    if (!editingProject) return;
    const updatedContent = { ...editingProject.content };
    updatedContent[projectKey] = { ...updatedContent[projectKey], [field]: value };
    setEditingProject({ ...editingProject, content: updatedContent });
  };

  // Ajouter un nouveau projet au content
  const addProjectToContent = () => {
    if (!editingProject) return;
    const projectCount = Object.keys(editingProject.content).length + 1;
    const newProjectKey = `project${projectCount}`;
    const updatedContent = {
      ...editingProject.content,
      [newProjectKey]: { title: '', description: '', link: '' }
    };
    setEditingProject({ ...editingProject, content: updatedContent });
  };

  // Supprimer un projet du content
  const removeProjectFromContent = (projectKey: string) => {
    if (!editingProject) return;
    const updatedContent = { ...editingProject.content };
    delete updatedContent[projectKey];
    setEditingProject({ ...editingProject, content: updatedContent });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des projets</h2>
        <Button size='sm' onClick={handleCreate} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" />
          Nouveau projet
        </Button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Formulaire d'édition */}
      {editingProject && (
        <Card className="border-2 border-blue-400 dark:border-blue-400">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {isCreating ? 'Nouveau projet' : 'Modifier le projet'}
              </h3>
              
              {/* Champs principaux */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Semestre</label>
                  <Input
                    value={editingProject.semestre}
                    onChange={(e) => updateEditingProject('semestre', e.target.value)}
                    placeholder="Semestre 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) => updateEditingProject('title', e.target.value)}
                    placeholder="R112 - Intégration"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={editingProject.description}
                    onChange={(e) => updateEditingProject('description', e.target.value)}
                    placeholder="Travaux en intégration"
                  />
                </div>
              </div>

              {/* Projets du content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Projets</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addProjectToContent}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    Ajouter un projet
                  </Button>
                </div>

                {Object.entries(editingProject.content).map(([key, project]) => (
                  <div key={key} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">{key}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProjectFromContent(key)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Titre</label>
                        <Input
                          value={project.title}
                          onChange={(e) => updateProjectContent(key, 'title', e.target.value)}
                          placeholder="Séquence 1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Input
                          value={project.description}
                          onChange={(e) => updateProjectContent(key, 'description', e.target.value)}
                          placeholder="Description du projet"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Lien</label>
                      <Input
                        value={project.link || ''}
                        onChange={(e) => updateProjectContent(key, 'link', e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-4">
                <Button variant="default" size="sm" onClick={handleSave} className="flex items-center gap-2 text-xs">
                  <Save className="w-4 h-4" />
                  Sauvegarder
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel} className="flex items-center gap-2 text-xs">
                  <X className="w-4 h-4" />
                  Annuler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des projets */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <Badge variant="outline">{project.semestre}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {project.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Object.keys(project.content).length} projet(s)
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContent(prev => ({ 
                      ...prev, 
                      [project.id]: !prev[project.id] 
                    }))}
                  >
                    {showContent[project.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setProjectToDelete(project);
                      setDeleteDialogOpen(true);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Détails des projets (expandable) */}
              {showContent[project.id] && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-2">
                    {Object.entries(project.content).map(([key, content]) => (
                      <div key={key} className="flex items-center justify-between p-2 border bg-background rounded hover:bg-muted rounded-lg">
                        <div>
                          <span className="font-medium text-sm">{content.title}</span>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {content.description}
                          </p>
                        </div>
                        {content.link && (
                          <a 
                            href={content.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-xs hover:underline"
                          >
                            Voir →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le projet <strong>"{projectToDelete?.title}"</strong> ? 
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={cancelDelete} className="text-xs">
              Annuler
            </Button>
            <Button variant="destructive" size="sm" onClick={confirmDelete} className="text-xs">
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 