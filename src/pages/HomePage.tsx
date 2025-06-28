import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from "@/components/Layout";
import { GridPatternCard, GridPatternCardBody } from "@/components/ui/card-with-grid-ellipsis-pattern";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthNavbar } from '@/components/AuthNavbar';
import { projectService } from '@/services/projectService';
import { ProjectItem, SemestreGroup } from '@/types/projects';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les projets depuis MongoDB
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔄 Début du chargement des données...');
        console.log('🔐 Utilisateur connecté:', isAuthenticated);
        setLoading(true);
        setError(null);
        
        let projectsData: ProjectItem[];
        
        if (isAuthenticated) {
          // Utilisateur connecté : utiliser la route protégée
          console.log('🔑 Utilisation de la route protégée');
          projectsData = await projectService.getAllProjects();
        } else {
          // Utilisateur non connecté : utiliser la route publique
          console.log('🌐 Utilisation de la route publique');
          projectsData = await projectService.getPublicProjects();
        }
        
        console.log('✅ Projets récupérés:', projectsData);
        setProjects(projectsData);
      } catch (err) {
        console.error('❌ Erreur lors du chargement des données:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des projets');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated]); // Recharger quand l'état d'authentification change

  // Grouper les projets par semestre
  const semestres = Array.from(new Set(projects.map(item => item.semestre)));
  const itemsBySemestre: SemestreGroup[] = semestres.map((sem) => ({
    semestre: sem,
    items: projects.filter((item) => item.semestre === sem),
  }));

  // Affichage de chargement
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des projets...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Affichage de la navbar d'authentification si connecté */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <AuthNavbar />
        </div>
      )}
      
      <GridPatternCard>
        <GridPatternCardBody>
          <Badge variant="outline" className="mb-1 text-[9px]">
            <span
              className="size-1.5 rounded-full bg-blue-500 mr-2"
              aria-hidden="true"
            ></span>
            Nouvelle version !
          </Badge>
          <h3 className="text-lg font-bold mb-1 text-foreground">
            Bienvenue sur mon VPS
          </h3>
          <p className="text-wrap text-sm text-foreground/60">
            Ce site est un projet personnel qui me permet de mettre en avant mes compétences et mes
            travaux. Vous pouvez y retrouver mes projets, mes créations ainsi que des ressources
            utiles. N'hésitez pas à explorer les différentes sections pour en savoir plus sur moi et
            mon travail.
          </p>
          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 <strong>Conseil :</strong> Connectez-vous pour accéder à la gestion des projets et à plus de fonctionnalités !
              </p>
            </div>
          )}
        </GridPatternCardBody>
      </GridPatternCard>
      
      {itemsBySemestre.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <div className="text-muted-foreground">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Aucun projet trouvé</h3>
            <p>Aucun projet n'est disponible pour le moment.</p>
          </div>
        </Card>
      ) : (
        itemsBySemestre.map(({ semestre, items }) => (
          <Card key={semestre} variant="plus" className="bg-background mt-6">
            <h2 className="text-xl font-bold mb-4">{semestre}</h2>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2"
            >
              {items.map((item) => (
                <AccordionItem
                  value={item.id}
                  key={item.id}
                  className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
                >
                  <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                    {item.title}
                  </AccordionTrigger>
                  {/* Affichage de la description de la matière */}
                  <span className="block text-muted-foreground mb-2 text-sm font-normal ps-7">{item.description}</span>
                  <AccordionContent className="text-muted-foreground ps-7 pb-2">
                    <div>
                      {Object.entries(item.content).map(([key, project]) => (
                        <div key={item.id + key}
                             className="mb-2 border p-4 flex flex-row items-center justify-between hover:bg-muted/20 transition-colors">
                          <div className='flex flex-col gap-1'>
                            <span className='text-md text-foreground'>{project.title}</span>
                            <span className='font-light text-muted-foreground'>{project.description}</span>
                          </div>
                          {/* Affichage d'un ou plusieurs liens */}
                          {project.links && project.links.length > 0 ? (
                            <div className="flex gap-2">
                              {project.links.map((url: string, idx: number) => (
                                <Button variant="outline" size="sm" asChild key={idx}>
                                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs">
                                    Voir l'exercice {idx + 1}
                                  </a>
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs">
                                Voir le projet
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        ))
      )}
    </Layout>
  );
}; 