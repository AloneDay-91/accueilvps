import {Button} from "@/components/ui/button.tsx";
import {ExternalLinkIcon, GitHubLogoIcon} from "@radix-ui/react-icons";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import React from "react";
import {cn} from "@/lib/utils.ts";
import {ComponentBooleanIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge.tsx";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Aucun outils",
        href: "#",
        description:
            "Aucun outils n'est disponible pour le moment.",
    }
]

export function Navbar() {
    return (
        <header className="flex items-center justify-between w-full max-w-4xl mx-auto h-16 z-40 border-x px-4 bg-background">
            <div>
                <a href="/" className="flex items-center space-x-2">
                    <a href="/">
                        <div className='flex items-center space-x-2'>
                            <Button variant="ghost" className="text-xl font-semibold">
                                <ComponentBooleanIcon/>
                                Elouan B.
                            </Button>
                            <Badge variant='outline'><span className="text-xs">mmi23f03</span></Badge>
                        </div>
                    </a>
                </a>
            </div>
            <nav>
                <NavigationMenu>
                    <NavigationMenuList className="bg-transparent">
                        <NavigationMenuItem>
                            <a href="/">
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Accueil
                                </NavigationMenuLink>
                            </a>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="#"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Mes travaux
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Retrouvez ici mes projets, mes créations et mes travaux universitaire.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Ressources">
                                        Documentation pour les ressources et les outils.
                                    </ListItem>
                                    <ListItem href="https://elouanb.fr" target="_blank" title="Portfolio">
                                        Mon portfolio personnel.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Outils</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <div className="flex items-center gap-2 ml-12">
                        <Button asChild variant="link">
                            <a href="https://elouanb.fr" target="_blank">
                                elouanb.fr
                                <ExternalLinkIcon/>
                            </a>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                            <a href="https://github.com/AloneDay-91" target="_blank">
                                <GitHubLogoIcon />
                            </a>
                        </Button>
                        <ThemeProvider>
                            <ModeToggle />
                        </ThemeProvider>
                    </div>
                </NavigationMenu>
            </nav>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"