import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG, buildWhatsAppUrl } from '../config/productConfig';

gsap.registerPlugin(ScrollTrigger);

export type SwitchMode = 'ON' | 'OFF' | 'STANDBY';

interface HeroBlackoutProps {
  lang: Lang;
  onToggleLang: (next: Lang) => void;
}

export function HeroBlackout({ lang, onToggleLang }: HeroBlackoutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const standbyTimerRef = useRef<number | null>(null);

  const [isDarkCut, setIsDarkCut] = useState(false); // Starts lit in warm daylight paper!
  const [flickering, setFlickering] = useState(false);
  const [switchMode, setSwitchMode] = useState<SwitchMode>('OFF');
  const [outageSeconds, setOutageSeconds] = useState(0);
  const [standbyWaiting, setStandbyWaiting] = useState(false);

  const t = COPY[lang].hero;

  // Format HH:MM:SS outage counter
  const formatClock = (sec: number) => {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Trigger the blackout cut animation sequence
  const runCutSequence = (afterCutMode: SwitchMode = 'ON') => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsDarkCut(true);
      setSwitchMode(afterCutMode);
      return;
    }

    setFlickering(true);
    window.setTimeout(() => setIsDarkCut(true), 90);
    window.setTimeout(() => setIsDarkCut(false), 180);
    window.setTimeout(() => setIsDarkCut(true), 270);
    window.setTimeout(() => {
      setFlickering(false);
      setStandbyWaiting(false);
      setSwitchMode(afterCutMode);
    }, 380);
  };

  // Initial Load: Lit warm paper scene -> ~1 s -> lights cut -> blackout + clock counts + lamp lights unit
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsDarkCut(true);
      setSwitchMode('ON');
      return;
    }

    const cutTimer = window.setTimeout(() => {
      runCutSequence('ON');
    }, 1000);

    const ctx = gsap.context(() => {
      if (sectionRef.current && productRef.current && window.innerWidth >= 1024) {
        gsap.to(productRef.current, {
          scale: 0.78,
          y: 120,
          x: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      window.clearTimeout(cutTimer);
      if (standbyTimerRef.current) window.clearTimeout(standbyTimerRef.current);
      ctx.revert();
    };
  }, []);

  // Outage clock ticks whenever lights are cut
  useEffect(() => {
    if (!isDarkCut) return;
    const interval = window.setInterval(() => {
      setOutageSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isDarkCut]);

  // Tactile 3-Position Switch handler
  const handleSwitchChange = (mode: SwitchMode) => {
    if (standbyTimerRef.current) {
      window.clearTimeout(standbyTimerRef.current);
      standbyTimerRef.current = null;
    }
    setSwitchMode(mode);

    if (mode === 'ON') {
      // ON lights the warm room and spins the fan blades
      setStandbyWaiting(false);
      setIsDarkCut(false);
    } else if (mode === 'OFF') {
      // OFF dims into blackout
      setStandbyWaiting(false);
      setIsDarkCut(true);
    } else if (mode === 'STANDBY') {
      // STANDBY shows "waiting for the next cut" with mains lit, then re-triggers the outage!
      setIsDarkCut(false);
      setStandbyWaiting(true);
      standbyTimerRef.current = window.setTimeout(() => {
        setOutageSeconds(0);
        runCutSequence('STANDBY');
      }, 1150);
    }
  };

  // Visual states derived from room light & switch position
  const roomLit = !isDarkCut;
  const lampOn = switchMode === 'ON' || (switchMode === 'STANDBY' && isDarkCut);
  const fanSpinning = switchMode === 'ON' || (switchMode === 'STANDBY' && isDarkCut);
  const standbyArmed = switchMode === 'STANDBY' && !isDarkCut;

  const whatsappHref = buildWhatsAppUrl(COPY[lang].contact.prefillMessage);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative min-h-screen w-full overflow-hidden pt-20 pb-14 flex flex-col justify-between transition-colors ${
        flickering ? 'duration-75' : 'duration-500'
      } ${
        roomLit
          ? 'bg-[#EDE6D8] text-[#141414]'
          : 'hero-blackout bg-[#141414] text-[#EDE6D8]'
      }`}
    >
      {/* Registration Corner Crosshairs (Printed Poster Detail) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 sm:inset-8 border border-current/15">
        <span className="absolute -top-2 -left-2 font-mono-data text-xs leading-none">+</span>
        <span className="absolute -top-2 -right-2 font-mono-data text-xs leading-none">+</span>
        <span className="absolute -bottom-2 -left-2 font-mono-data text-xs leading-none">+</span>
        <span className="absolute -bottom-2 -right-2 font-mono-data text-xs leading-none">+</span>
      </div>

      {/* Realistic Room Backdrop & Floor Shadow Plane */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floor surface transition */}
        <div
          className={`absolute inset-x-0 bottom-0 h-[28%] border-t-2 transition-colors duration-500 ${
            roomLit
              ? 'bg-[#E2D9C6] border-[#141414]/25'
              : 'bg-[#0E0E0E] border-[#EDE6D8]/10'
          }`}
        />

        {/* Unit Lamp Illumination Cone in the dark */}
        {!roomLit && lampOn && (
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at 76% 58%, rgba(237, 230, 216, 0.22) 0%, rgba(20, 20, 20, 0) 48%)',
            }}
          />
        )}
      </div>

      {/* Top Row: Karachi Street Shop-Sign Outage Clock + Stamped Status + EN/اردو Switch */}
      <div className="relative z-[60] mx-auto w-full max-w-[1440px] px-6 sm:px-10 flex flex-wrap items-start justify-between gap-4">
        {/* Street Shop-Sign Digital Outage Clock */}
        <div className="flex flex-wrap items-center gap-4">
          <div
            className={`relative px-4 py-2.5 border-2 transition-colors ${
              roomLit
                ? 'bg-[#141414] text-[#EDE6D8] border-[#141414] print-shadow-vermilion'
                : 'bg-[#1C1B19] text-[#EDE6D8] border-[#EDE6D8]/35'
            }`}
          >
            {/* Shop-sign corner rivets */}
            <span className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#E8452C]" />
            <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#E8452C]" />
            <div className="font-mono-data text-[10px] tracking-[0.18em] text-[#EDE6D8]/70">
              {t.clockLabel}
            </div>
            <div className="font-mono-data text-2xl sm:text-3xl font-bold tracking-wider text-[#E8452C]">
              {formatClock(outageSeconds)}
            </div>
          </div>

          {/* Rotated Printed Stamp Badge */}
          <div
            className={`px-3 py-1.5 border-2 font-mono-data text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              isDarkCut
                ? '-rotate-3 border-[#E8452C] bg-[#E8452C] text-[#EDE6D8] opacity-100 scale-100'
                : standbyWaiting
                  ? '-rotate-2 border-[#0F5E5A] bg-[#0F5E5A] text-[#EDE6D8] opacity-100'
                  : 'rotate-0 border-[#0F5E5A] text-[#0F5E5A] bg-[#EDE6D8]'
            }`}
          >
            {standbyWaiting
              ? t.stampStandby
              : isDarkCut
                ? t.stampCut
                : t.stampPower}
          </div>
        </div>

        {/* EN / اردو Language Toggle */}
        <div
          role="group"
          aria-label={t.ariaLangToggle}
          className={`relative z-[60] inline-flex border-2 bg-[#EDE6D8] text-[#141414] print-shadow-sm ${
            roomLit ? 'border-[#141414]' : 'border-[#EDE6D8]'
          }`}
        >
          <button
            type="button"
            aria-pressed={lang === 'en'}
            onClick={() => onToggleLang('en')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-mono-data font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation ${
              lang === 'en'
                ? 'bg-[#E8452C] text-[#EDE6D8]'
                : 'bg-[#EDE6D8] text-[#141414] hover:bg-[#E2D9C6]'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={lang === 'ur'}
            onClick={() => onToggleLang('ur')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation border-s-2 ${
              roomLit ? 'border-[#141414]' : 'border-[#141414]'
            } ${
              lang === 'ur'
                ? 'bg-[#E8452C] text-[#EDE6D8]'
                : 'bg-[#EDE6D8] text-[#141414] hover:bg-[#E2D9C6]'
            }`}
          >
            اردو
          </button>
        </div>
      </div>

      {/* Main Overlapping Composition: Giant Type Partly Behind Huge Edge-Cropped Product */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-10 my-auto py-6">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Giant Urdu Outline Echo + Display Headline (z-10 so it sits partly behind product) */}
          <div className="lg:col-span-8 relative z-10 pointer-events-none select-none">
            <div
              aria-hidden="true"
              className="font-urdu-graphic urdu-outline text-5xl sm:text-7xl lg:text-8xl font-bold mb-1"
            >
              {t.urduEcho}
            </div>

            <h1
              className="font-display uppercase leading-[0.9] tracking-tight print-misalign"
              style={{
                fontSize: 'clamp(3.1rem, 8.2vw, 7.25rem)',
                textWrap: 'balance',
              }}
            >
              <span className="block">{t.headlineLine1}</span>
              <span className="block">{t.headlineLine2}</span>
            </h1>
          </div>

          {/* Huge Product Cropped Off the Inline-End Edge (z-20 overlapping headline) */}
          <div
            ref={productRef}
            className="lg:col-span-6 lg:col-start-7 lg:-mt-24 lg:-me-36 relative z-20 flex flex-col items-end"
          >
            <div
              dir="ltr"
              className="relative w-full max-w-[740px] ltr:lg:translate-x-14 rtl:lg:-translate-x-14"
            >
              {/* Realistic Floor Contact Shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 inset-x-10 h-8 rounded-[100%] blur-md"
                style={{
                  background: roomLit
                    ? 'radial-gradient(ellipse at center, rgba(20,20,20,0.45) 0%, rgba(20,20,20,0) 75%)'
                    : 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 75%)',
                }}
              />

              {/* Tight Image Wrapper: overlays match 1080x670 image coordinates 1:1 across scales/tilts */}
              <div className="relative w-full">
                {/* Product Cutout */}
                <img
                  src={PRODUCT_CONFIG.assets.frontCutout}
                  alt={t.altUnit}
                  referrerPolicy="no-referrer"
                  className={`block w-full h-auto relative z-10 select-none transition-all duration-500 ${
                    roomLit
                      ? 'brightness-100'
                      : lampOn
                        ? 'brightness-[0.88]'
                        : 'brightness-[0.35]'
                  }`}
                />

                {/* Built-in LED Lamp illumination */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute z-20 rounded-md transition-opacity duration-300 ${
                    lampOn ? 'opacity-95' : 'opacity-0'
                  }`}
                  style={{
                    left: '50.2%',
                    top: '27.2%',
                    width: '22.3%',
                    height: '16.5%',
                    background:
                      'radial-gradient(circle, rgba(255,253,245,0.96) 0%, rgba(237,230,216,0.5) 100%)',
                    boxShadow: '0 0 42px 14px rgba(255, 248, 225, 0.72)',
                  }}
                />

                {/* Spinning Blower Fan Blades centered on circular grille (273.0px, 360.5px in 1080x670) */}
                {fanSpinning && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute z-20 rounded-full overflow-hidden opacity-45"
                    style={{
                      left: '25.28%',
                      top: '53.81%',
                      width: '26.8%',
                      aspectRatio: '1 / 1',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="block w-full h-full animate-fan-spin"
                      style={{ transformOrigin: '50% 50%' }}
                    >
                      <path
                        d="M50,50 C54,19 72,17 63,44 Z M50,50 C81,54 83,72 56,63 Z M50,50 C46,81 28,83 37,56 Z M50,50 C19,46 17,28 44,37 Z"
                        fill="#141414"
                      />
                      <circle cx="50" cy="50" r="10" fill="#141414" />
                    </svg>
                  </div>
                )}

                {/* Unit's Own 5 Status LEDs (Full, Med, Low, Standby, Charging) */}
                <div aria-hidden="true" className="pointer-events-none absolute z-20 inset-0">
                  <span
                    className={`absolute w-2.5 h-2.5 rounded-full transition-opacity duration-300 ${
                      lampOn ? 'opacity-100 bg-[#3DFF7A] shadow-[0_0_8px_#3DFF7A]' : 'opacity-0'
                    }`}
                    style={{ left: '89.1%', top: '24.5%' }}
                  />
                  <span
                    className={`absolute w-2.5 h-2.5 rounded-full transition-opacity duration-300 delay-75 ${
                      lampOn || standbyArmed
                        ? 'opacity-100 bg-[#3DFF7A] shadow-[0_0_8px_#3DFF7A]'
                        : 'opacity-0'
                    }`}
                    style={{ left: '89.1%', top: '29.2%' }}
                  />
                  <span
                    className={`absolute w-2.5 h-2.5 rounded-full transition-opacity duration-300 ${
                      switchMode === 'STANDBY'
                        ? 'opacity-100 bg-[#E8452C] shadow-[0_0_10px_#E8452C]'
                        : 'opacity-0'
                    }`}
                    style={{ left: '89.1%', top: '38.6%' }}
                  />
                  <span
                    className={`absolute w-2.5 h-2.5 rounded-full transition-opacity duration-300 ${
                      roomLit ? 'opacity-100 bg-[#3DFF7A] shadow-[0_0_8px_#3DFF7A]' : 'opacity-0'
                    }`}
                    style={{ left: '89.1%', top: '43.4%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Hero Interactive Bar: Subhead + Two CTAs + Tactile 3-Position Switch */}
        <div className="relative z-30 mt-6 lg:-mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Subhead + 2 CTAs + Trust Line */}
          <div className="lg:col-span-6 space-y-5">
            <p
              className={`text-base sm:text-lg max-w-lg font-medium leading-relaxed ${
                roomLit ? 'text-[#4E4940]' : 'text-[#EDE6D8]/85'
              }`}
            >
              {t.subhead}
            </p>

            {/* Two CTAs ONLY */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] print-shadow font-bold text-sm sm:text-base hover:translate-x-[2px] hover:translate-y-[2px] transition-transform whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>{t.ctaPrimary}</span>
              </a>

              <a
                href="#calculator"
                className={`inline-flex items-center px-5 py-3.5 border-2 font-bold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 ${
                  roomLit
                    ? 'border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#EDE6D8]'
                    : 'border-[#EDE6D8]/70 text-[#EDE6D8] hover:bg-[#EDE6D8] hover:text-[#141414]'
                }`}
              >
                {t.ctaSecondary}
              </a>
            </div>

            <p className="font-mono-data text-xs tracking-wide opacity-75">{t.trustLine}</p>
          </div>

          {/* Large Tactile 3-Position Switch (ON / OFF / STANDBY) */}
          <div className="lg:col-span-6 flex lg:justify-end">
            <div
              className={`p-4 border-2 transition-colors ${
                roomLit
                  ? 'bg-[#E2D9C6] border-[#141414] text-[#141414] print-shadow'
                  : 'bg-[#1D1C1A] border-[#EDE6D8]/40 text-[#EDE6D8]'
              }`}
            >
              <div className="flex items-center justify-between gap-6 mb-3">
                <span className="font-mono-data text-xs font-bold uppercase tracking-wider">
                  {t.switchLabel}
                </span>
                <span className="font-mono-data text-xs text-[#E8452C] font-bold">
                  {standbyWaiting ? t.stampStandby : t.switchModes[switchMode]}
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label={t.switchLabel}
                className="inline-flex border-2 border-[#141414] bg-[#141414] p-1 gap-1"
              >
                {(['ON', 'OFF', 'STANDBY'] as SwitchMode[]).map((mode) => {
                  const active = switchMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => handleSwitchChange(mode)}
                      className={`px-4 sm:px-5 py-2.5 font-mono-data text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? mode === 'ON'
                            ? 'bg-[#0F5E5A] text-[#EDE6D8]'
                            : mode === 'STANDBY'
                              ? 'bg-[#E8452C] text-[#EDE6D8]'
                              : 'bg-[#EDE6D8] text-[#141414]'
                          : 'bg-[#1F1E1C] text-[#EDE6D8]/70 hover:text-[#EDE6D8]'
                      }`}
                    >
                      {t.switchModes[mode]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
