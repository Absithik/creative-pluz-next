import StudioOverlayAnimation from './StudioOverlay.client';

export const StudioOverlay: React.FC = () => {
  return (
    <StudioOverlayAnimation>
      {/* Pass content as children - all rendered on server */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center p-6 sm:p-12 pointer-events-none">
        <header className="w-full flex flex-col justify-between items-start gap-12">
          {/* LEFT SIDE: Main Title */}
          <div className="flex flex-col">
            <h1 className="font-display font-black italic text-6xl sm:text-8xl mt-8 md:text-[7rem] lg:text-[9rem] leading-[0.8] tracking-tighter text-white uppercase drop-shadow-2xl">
              Print &<br />
              <span className="text-transparent bg-clip-text bg-yellow-400">
                Digital
              </span>
            </h1>
          </div>

          {/* RIGHT SIDE: Description & Button */}
          <div className="flex flex-col gap-8 max-w-md mt-4 lg:mt-8">
            <p className="font-sans text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
              Your brand identity is more than just a logo — it's the face of your business.
              We build brands that leave a legacy through unique, scalable designs.
            </p>

            <button className="group relative w-fit px-8 py-3 border border-white/30 overflow-hidden rounded-full transition-all hover:border-white">
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative font-sans font-bold tracking-[0.2em] uppercase text-xs text-white group-hover:text-black transition-colors duration-300">
                Start Your Legacy
              </span>
            </button>
          </div>
        </header>
      </div>
    </StudioOverlayAnimation>
  );
};