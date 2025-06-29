import {Button} from "@/components/ui/button.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {ExternalLinkIcon} from "@radix-ui/react-icons";
import { useAuth } from '@/contexts/AuthContext';

export function Footer() {
    const { isAuthenticated } = useAuth();

    return (
        <footer className="flex items-center justify-between w-full max-w-4xl mx-auto h-16 z-40 border-x px-4 bg-background">
            <p className="text-muted-foreground text-sm font-normal">
                &copy; 2025 ElouanB.
            </p>
            <div className="flex items-center gap-2 ml-12">
                {!isAuthenticated && (
                    <Button asChild variant="link">
                        <a href="https://elouanb.fr" target="_blank" className="text-xs">
                            elouanb.fr
                            <ExternalLinkIcon className="!w-3" />
                        </a>
                    </Button>
                )}
                <ThemeProvider>
                    <ModeToggle/>
                </ThemeProvider>
            </div>
        </footer>
    );
}