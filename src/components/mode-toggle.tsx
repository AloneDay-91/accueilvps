import {SunIcon, MoonIcon, DesktopIcon} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Changer de thème</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                    Clair
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                    Sombre
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
                    Système
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
