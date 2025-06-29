import { Navbar } from "@/components/Navbar";
import {Footer} from "@/components/Footer.tsx";
import ModalPub from "@/components/ModalPub.tsx";
import { ProgressToastProvider } from "@/contexts/ProgressToastContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            <ProgressToastProvider>
                <ModalPub/>
                <div className='border w-full size-full bg-repeat bg-[length:30px_30px] bg-lines-pattern-light dark:bg-lines-pattern'>
                    <Navbar />
                </div>
                <div>
                    <main>
                        <div className='border-x border-b w-full'>
                            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                            <div className='max-w-4xl mx-auto border-x w-full p-4 space-y-4 min-h-screen bg-background'>
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
                <div
                    className='w-full size-full bg-repeat bg-[length:30px_30px] bg-lines-pattern-light dark:bg-lines-pattern'>
                    <Footer/>
                </div>
            </ProgressToastProvider>
        </SettingsProvider>
    );
}
