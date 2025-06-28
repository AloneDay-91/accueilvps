// Types pour les projets
export interface Project {
  title: string;
  description: string;
  link?: string;
  links?: string[];
}

export interface ProjectItem {
  semestre: string;
  id: string;
  title: string;
  description: string;
  content: {
    [key: string]: Project;
  };
}

export interface ProjectsData {
  items: ProjectItem[];
}

export interface SemestreGroup {
  semestre: string;
  items: ProjectItem[];
} 