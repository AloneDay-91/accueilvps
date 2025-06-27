export default function ModalPub() {
    return (
        <div className="fixed z-50 flex items-center justify-center bottom-6 right-12 w-64">
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
