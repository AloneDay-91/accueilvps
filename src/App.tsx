import Layout from "@/components/Layout";
import { GridPatternCard, GridPatternCardBody } from "@/components/ui/card-with-grid-ellipsis-pattern";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {Badge} from "@/components/ui/badge.tsx";

export default function App() {
    const items = [
        {
            semestre: "Semestre 1",
            id: "r112",
            title: "R112 - Intégration",
            description: "Travaux en intégration",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Batman",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence1",
                },
                project2: {
                    title: "Séquence 2",
                    description: "Yoko's Kitchen",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence2",
                },
                project3: {
                    title: "Séquence 3",
                    description: "Mr Potato",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence3",
                },
                project4: {
                    title: "Séquence 4",
                    description: "John Doe",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence4",
                },
                project5: {
                    title: "Séquence 5",
                    description: "Arboretum",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence5",
                },
                project6: {
                    title: "Séquence 6",
                    description: "Gamers",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence6",
                },
            },
        },
        {
            semestre: "Semestre 1",
            id: "r113",
            title: "R113 - Développement",
            description: "Travaux en développement",
            content: {
                project1: {
                    title: "Aucun projet",
                    description: "Aucun projet n'est disponible pour le moment.",
                    link: "#",
                },
            },
        },
        {
            semestre: "Semestre 2",
            id: "r212",
            title: "R212 - Intégration",
            description: "Travaux en intégration",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Monopoly",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence1/monopoly.html",
                },
                project2: {
                    title: "Séquence 2",
                    description: "Hony Tawk",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence2",
                },
                project3: {
                    title: "Séquence 3",
                    description: "Calculatrice",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence3",
                },
                project4: {
                    title: "Séquence 4",
                    description: "TD JavaScript",
                    links: [
                        "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence4/exercice1.html",
                        "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence4/exercice2.html",
                        "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence4/exercice3.html",
                    ],
                },
                project5: {
                    title: "Séquence 5",
                    description: "Parallax",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence5",
                },
                project6: {
                    title: "Séquence 6",
                    description: "Wow.js",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence6",
                },
            },
        },
        {
            semestre: "Semestre 2",
            id: "r213",
            title: "R213 - Développement",
            description: "Travaux en développement",
            content: {
                project1: {
                    title: "Aucun projet",
                    description: "Aucun projet n'est disponible pour le moment.",
                    link: "#",
                },
            },
        },
        {
            semestre: "Semestre 2",
            id: "r203",
            title: "R203 - Accessibilité",
            description: "Travaux en accessibilité",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Réservation",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r203/sequence1",
                },
            },
        },
        {
            semestre: "Semestre 3",
            id: "r312",
            title: "R312 - Intégration",
            description: "Travaux en intégration",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Toy Story",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r312/sequence1/index.html",
                },
                project2: {
                    title: "Séquence 2",
                    description: "Chat",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r312/sequence2/index.html",
                },
                project3: {
                    title: "Séquence 3",
                    description: "Drag",
                    link: "http://mmi23f03.mmi-troyes.fr/travaux/r312/sequence3/exo2.html",
                },
                project4: {
                    title: "SASS/SCSS",
                    description: "Café",
                    link: "http://mmi23f03.mmi-troyes.fr/scss/",
                },
            },
        },
        {
            semestre: "Semestre 3",
            id: "r319",
            title: "R319 - Symfony",
            description: "Travaux en Symfony",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "MMIPLE",
                    link: "https://github.com/AloneDay-91/mmiple",
                },
            },
        },
        {
            semestre: "Semestre 4",
            id: "r405",
            title: "R405 - Création et design intéractif",
            description: "Travaux en création et design intéractif",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Three.js",
                    link: "https://mmi23f03.mmi-troyes.fr/",
                },
            },
        },
        {
            semestre: "Semestre 4",
            id: "r406",
            title: "R406 - Développement front",
            description: "Travaux en développement front",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Vue.js",
                    link: "https://github.com/AloneDay-91/vuejsdemo",
                },
            },
        },
        {
            semestre: "Semestre 4",
            id: "r407",
            title: "R407 - Développement back",
            description: "Travaux en développement back",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "MMIPLE V2",
                    link: "https://github.com/AloneDay-91/mmiple-S4",
                },
            },
        },
        {
            semestre: "Semestre 4",
            id: "r409",
            title: "R409 - Unity",
            description: "Travaux en Unity",
            content: {
                project1: {
                    title: "Séquence 1",
                    description: "Bowling",
                    link: "http://mmi23f03.mmi-troyes.fr/bowling/",
                },
            },
        },
    ];

    const semestres = Array.from(new Set(items.map(item => item.semestre)));
    const itemsBySemestre = semestres.map((sem) => ({
        semestre: sem,
        items: items.filter((item) => item.semestre === sem),
    }));

    return (
        <Layout>
            <GridPatternCard>
                <GridPatternCardBody>
                    <Badge variant="outline" className="mb-1 text-[9px]">Nouvelle version !</Badge>
                    <h3 className="text-lg font-bold mb-1 text-foreground">
                        Bienvenue sur mon VPS
                    </h3>
                    <p className="text-wrap text-sm text-foreground/60">
                        Ce site est un projet personnel qui me permet de mettre en avant mes compétences et mes
                        travaux. Vous pouvez y retrouver mes projets, mes créations ainsi que des ressources
                        utiles. N'hésitez pas à explorer les différentes sections pour en savoir plus sur moi et
                        mon travail.
                    </p>
                </GridPatternCardBody>
            </GridPatternCard>
            {itemsBySemestre.map(({ semestre, items }) => (
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
                                                {"links" in project ? (
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
            ))}
        </Layout>
    );
}