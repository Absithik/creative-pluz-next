
import { VISITING_CARD_CONTENT } from "./data";
import VisitingCards from "./VisitingCards";

export default function VisitingCardPage() {
    return (
        <section className="relative h-[200vh] bg-black overflow-hidden flex flex-col pt-32">

            {/* Content (No longer Overlay) */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 mb-12">
                <h1 className="text-6xl md:text-9xl font-shrikhand text-white mb-4 drop-shadow-sm ">
                    Visiting Cards
                </h1>
                <p className="text-lg md:text-xl font-syne text-white/70 max-w-lg font-medium">
                    Premium tactile brand colaterals designed to leave a lasting impression.
                </p>

                <div className="mt-8 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-widest font-bold text-white">Scroll & Hover to Interact</p>
                </div>
            </div>

            <div className="flex-1 relative w-full flex items-center justify-center">
                <VisitingCards cards={VISITING_CARD_CONTENT.cards} />
            </div>

            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 bg-b"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            ></div>

        </section>
    );
}
