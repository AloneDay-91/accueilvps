import {Button} from "@/components/ui/button.tsx";
import {ExternalLinkIcon, GitHubLogoIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {cn} from "@/lib/utils.ts";
import {ComponentBooleanIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge.tsx";
import {BookOpenIcon, EllipsisIcon, InfoIcon, LifeBuoyIcon, BarChart3} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/contexts/AuthContext';

const navigationLinks = [
    { href: "/", label: "Accueil" },
    {
        label: "Projets",
        submenu: true,
        type: "description",
        items: [
            {
                href: "https://elouanb.fr",
                label: "Portfolio",
                description: "Découvrez mes projets récents.",
            },
            {
                href: "/docs",
                label: "Documentation",
                description: "Accédez à la documentation de mes projets.",
            },
            {
                href: "https://bg.elouanb.fr",
                label: "Background Collection",
                description: "Collection de backgrounds pour vos projets.",
            },
            {
                href: "https://elouanb.fr/qrgenerator",
                label: "QRCode Generator",
                description: "Générez des QR codes personnalisés.",
            },
        ],
    },
]

export function Navbar() {
    const { isAuthenticated } = useAuth();

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
            <nav className='hidden md:block'>
                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        {navigationLinks.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                {link.submenu ? (
                                    <>
                                        <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                                            {link.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                                            <ul
                                                className={cn(
                                                    link.type === "description"
                                                        ? "min-w-64"
                                                        : "min-w-48"
                                                )}
                                            >
                                                {link.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <NavigationMenuLink
                                                            href={item.href}
                                                            className="py-1.5"
                                                        >
                                                            {/* Display icon if present */}
                                                            {link.type === "icon" && "icon" in item && (
                                                                <div className="flex items-center gap-2">
                                                                    {item.icon === "BookOpenIcon" && (
                                                                        <BookOpenIcon
                                                                            size={16}
                                                                            className="text-foreground opacity-60"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    {item.icon === "LifeBuoyIcon" && (
                                                                        <LifeBuoyIcon
                                                                            size={16}
                                                                            className="text-foreground opacity-60"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    {item.icon === "InfoIcon" && (
                                                                        <InfoIcon
                                                                            size={16}
                                                                            className="text-foreground opacity-60"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    <span>{item.label}</span>
                                                                </div>
                                                            )}

                                                            {/* Display label with description if present */}
                                                            {link.type === "description" &&
                                                            "description" in item ? (
                                                                <div className="space-y-1">
                                                                    <div className="font-medium">
                                                                        {item.label}
                                                                    </div>
                                                                    <p className="text-muted-foreground line-clamp-2 text-xs">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                // Display simple label if not icon or description type
                                                                !link.type ||
                                                                (link.type !== "icon" &&
                                                                    link.type !== "description" && (
                                                                        <span>{item.label}</span>
                                                                    ))
                                                            )}
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                    >
                                        {link.label}
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        ))}
                        
                        {/* Bouton Dashboard pour les utilisateurs connectés */}
                        {isAuthenticated && (
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/dashboard"
                                    className="text-muted-foreground hover:text-primary py-1.5 font-medium flex items-center gap-2"
                                >
                                    Dashboard
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
            <NavigationMenu>
                <div className="items-center gap-2 ml-12 hidden md:flex">
                    <Button asChild variant="link" className="hidden md:flex">
                        <a href="https://elouanb.fr" target="_blank" className='text-xs'>
                            elouanb.fr
                            <ExternalLinkIcon className="!w-3" />
                        </a>
                    </Button>
                    <div className="flex items-center">
                        <Button asChild variant="ghost" size="icon">
                            <a href="https://github.com/AloneDay-91" target="_blank">
                                <GitHubLogoIcon />
                            </a>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                            <a href="https://www.linkedin.com/in/elouanbruzek/" target="_blank">
                                <LinkedInLogoIcon />
                            </a>
                        </Button>
                    </div>
                    <ThemeProvider>
                        <ModeToggle />
                    </ThemeProvider>
                </div>
                <div className="flex md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon" className="rounded-full shadow-none">
                                <EllipsisIcon size={16} aria-hidden="true" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col p-2">
                            <div className="flex items-center flex-col">
                                <Button asChild variant="ghost" size="icon">
                                    <a href="https://github.com/AloneDay-91" target="_blank" className='text-xs w-full'>
                                        Github
                                        <GitHubLogoIcon />
                                    </a>
                                </Button>
                                <Button asChild variant="ghost" size="icon">
                                    <a href="https://www.linkedin.com/in/elouanbruzek/" target="_blank" className='text-xs w-full'>
                                        LinkedIn
                                        <LinkedInLogoIcon />
                                    </a>
                                </Button>
                            </div>
                            <Button asChild variant="link">
                                <a href="https://elouanb.fr" target="_blank" className='text-xs w-full'>
                                    elouanb.fr
                                    <ExternalLinkIcon className="!w-3" />
                                </a>
                            </Button>
                            {/* Bouton Dashboard mobile pour les utilisateurs connectés */}
                            {isAuthenticated && (
                                <Button asChild variant="ghost" size="icon">
                                    <a href="/dashboard" className='text-xs w-full flex items-center gap-2'>
                                        <BarChart3 className="w-4 h-4" />
                                        Dashboard
                                    </a>
                                </Button>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </NavigationMenu>
        </header>
    )
}