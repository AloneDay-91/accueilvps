import { useSettings } from '@/contexts/SettingsContext';

export default function ModalPub() {
    const { settings, loading } = useSettings();

    // Ne pas afficher si les paramètres ne sont pas chargés ou si la modal est désactivée
    if (loading || !settings?.showPubModal) {
        return null;
    }

    return (
        <div className="fixed z-50 items-center justify-center bottom-6 right-12 w-64 hidden md:flex">
            <div className="relative bg-background border rounded-lg flex flex-row items-center p-3 w-full">
                <img
                    src="/img.png"
                    className="w-20 h-20 object-cover rounded mr-3"
                    alt="Aperçu du background generator"
                />
                <div className="flex flex-col items-start gap-2">
                    <span
                        className="flex-wrap text-xs"
                    >
                        Collection de backgrounds pour vos projets.
                    </span>
                    <a href="https://bg.elouanb.fr"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-wrap text-xs underline">
                        Voir la collection
                    </a>
                </div>
            </div>
        </div>
    );
}
