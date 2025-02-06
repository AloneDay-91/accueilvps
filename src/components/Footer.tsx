import {Button} from "@/components/ui/button.tsx";
import {SquareArrowOutUpRight} from "lucide-react";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

export function Footer() {
    return (
        <footer className="flex items-center justify-between max-w-screen-2xl w-full h-24 border-t mt-24">
            <p className="text-muted-foreground">
                &copy; 2024 ElouanB.
            </p>
            <div className="flex items-center gap-2 ml-12">
                <a href="https://elouanb.fr">
                    <Button variant="ghost">
                        elouanb.fr
                        <SquareArrowOutUpRight strokeWidth={1}/>
                    </Button>
                </a>
                <ThemeProvider>
                    <ModeToggle/>
                </ThemeProvider>
            </div>
        </footer>
    );
}