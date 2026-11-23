import { useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { COPY, HOTSPOT_COORDS, HotspotCoord, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG } from '../config/productConfig';

interface UnitTourProps {
  lang: Lang;
}

export function UnitTour({ lang }: UnitTourProps) {
  const [view, setView] = useState<'front' | 'rear'>('front');
  const [selectedNum, setSelectedNum] = useState<string>('01');
  const [zoomed, setZoomed] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const t = COPY[lang].tour;
  const visibleHotspots = HOTSPOT_COORDS.filter((h) => h.view === view);
  const activeHotspot: HotspotCoord =
    HOTSPOT_COORDS.find((h) => h.num === selectedNum) || visibleHotspots[0];
  const activeText = t.hotspots[activeHotspot.num];

  const handleSelectHotspot = (spot: HotspotCoord, openSheet = true) => {
    setView(spot.view);
    setSelectedNum(spot.num);
    setZoomed(true);
    if (openSheet) setMobileSheetOpen(true);
  };

  const handleSwitchView = (nextView: 'front' | 'rear') => {
    setView(nextView);
    setZoomed(false);
    setMobileSheetOpen(false);
    const first = HOTSPOT_COORDS.find((h) => h.view === nextView);
    if (first) setSelectedNum(first.num);
  };

  const handleReset = () => {
    setZoomed(false);
    setMobileSheetOpen(false);
  };

  // Keyboard navigation: ArrowLeft/Up & ArrowRight/Down to step hotspots, Escape to reset view
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleReset();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const idx = HOTSPOT_COORDS.findIndex((h) => h.num === selectedNum);
      if (idx === -1) return;
      const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const nextIdx = forward
        ? (idx + 1) % HOTSPOT_COORDS.length
        : (idx - 1 + HOTSPOT_COORDS.length) % HOTSPOT_COORDS.length;
      e.preventDefault();
      handleSelectHotspot(HOTSPOT_COORDS[nextIdx], false);
    }
  };

  // Smooth camera pan & zoom toward the active hotspot
  const zoomTransform = (() => {
    if (!zoomed || activeHotspot.view !== view) return 'scale(1) translate(0%, 0%)';
    const dx = Math.max(-18, Math.min(18, 50 - activeHotspot.x)) * 0.65;
    const dy = Math.max(-18, Math.min(18, 50 - activeHotspot.y)) * 0.65;
    return `scale(1.36) translate(${dx.toFixed(1)}%, ${dy.toFixed(1)}%)`;
  })();

  const isActiveOnCurrentView = activeHotspot.view === view;

  return (
    <section
      id="unit-tour"
      onKeyDown={handleKeyDown}
      className="relative bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        {/* Header + Front/Rear Toggle + Reset */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b-2 border-[#141414] mb-12">
          <div className="max-w-2xl">
            <p className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C] mb-3">
              {t.kicker}
            </p>
            <h2
              className="font-display text-[#141414] leading-[1.02] mb-3"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
            >
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#4E4940]">{t.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div
              role="tablist"
              aria-label={t.ariaPanelView}
              className="inline-flex border-2 border-[#141414] bg-[#E2D9C6] p-1 gap-1 print-shadow-sm"
            >
              <button
                type="button"
                role="tab"
                aria-selected={view === 'front'}
                onClick={() => handleSwitchView('front')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                  view === 'front'
                    ? 'bg-[#141414] text-[#EDE6D8]'
                    : 'text-[#141414] hover:bg-[#EDE6D8]'
                }`}
              >
                {t.frontBtn}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === 'rear'}
                onClick={() => handleSwitchView('rear')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                  view === 'rear'
                    ? 'bg-[#141414] text-[#EDE6D8]'
                    : 'text-[#141414] hover:bg-[#EDE6D8]'
                }`}
              >
                {t.rearBtn}
              </button>
            </div>

            {zoomed && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono-data font-bold border-2 border-[#141414] bg-[#EDE6D8] text-[#141414] hover:bg-[#E8452C] hover:text-[#EDE6D8] transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.resetBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Sticky Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Blueprint Stage */}
          <div className="lg:col-span-7 lg:sticky lg:top-20">
            <div className="relative bg-[#141414] border-2 border-[#141414] print-shadow overflow-hidden">
              {/* Blueprint grid lines behind the real product */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #0F5E5A 1px, transparent 1px), linear-gradient(to bottom, #0F5E5A 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Top blueprint metadata strip */}
              <div className="relative z-30 px-4 py-2.5 border-b border-[#EDE6D8]/15 flex items-center justify-between text-[11px] font-mono-data text-[#EDE6D8]/75">
                <span>
                  {PRODUCT_CONFIG.model} · {view === 'front' ? t.frontBtn : t.rearBtn}
                </span>
                <span className="hidden sm:inline">{t.kbHint}</span>
              </div>

              {/* Camera Zoom Container (LTR-locked so photo hotspot coordinates match hardware) */}
              <div dir="ltr" className="relative p-4 sm:p-8 overflow-hidden">
                <div
                  className="relative w-full transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: zoomTransform }}
                >
                  <img
                    src={
                      view === 'front'
                        ? PRODUCT_CONFIG.assets.frontCutout
                        : PRODUCT_CONFIG.assets.rearCutout
                    }
                    alt={view === 'front' ? t.altFront : t.altRear}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto relative z-10 select-none"
                  />

                  {/* Spotlight Dimming Overlay when a hotspot is focused */}
                  {zoomed && isActiveOnCurrentView && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-15 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle 18% at ${activeHotspot.x}% ${activeHotspot.y}%, rgba(20,20,20,0) 0%, rgba(20,20,20,0.68) 100%)`,
                      }}
                    />
                  )}

                  {/* Blueprint Leader Line from Active Hotspot to Floating HUD Label */}
                  {isActiveOnCurrentView && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 w-full h-full z-20"
                    >
                      <polyline
                        points={`${activeHotspot.x},${activeHotspot.y} ${activeHotspot.x},${activeHotspot.ly} ${activeHotspot.lx},${activeHotspot.ly}`}
                        fill="none"
                        stroke="#E8452C"
                        strokeWidth="0.5"
                        strokeDasharray="1.4 1"
                      />
                      <circle
                        cx={activeHotspot.x}
                        cy={activeHotspot.y}
                        r="1.1"
                        fill="#E8452C"
                      />
                    </svg>
                  )}

                  {/* Floating Translucent HUD Callout over real photo (desktop/tablet) */}
                  {isActiveOnCurrentView && (
                    <div
                      style={{ left: `${activeHotspot.lx}%`, top: `${activeHotspot.ly}%` }}
                      className="hidden sm:block absolute z-25 -translate-x-1/2 -translate-y-1/2 pointer-events-none photo-hud px-2.5 py-1 text-[10px] font-mono-data font-bold text-[#EDE6D8] whitespace-nowrap"
                    >
                      <span className="text-[#E8452C] me-1.5">{activeHotspot.num}</span>
                      <span>{activeText.shortTag}</span>
                    </div>
                  )}

                  {/* Numbered Interactive Hotspots */}
                  {visibleHotspots.map((spot) => {
                    const isActive = spot.num === activeHotspot.num;
                    const spotText = t.hotspots[spot.num];
                    return (
                      <button
                        key={spot.num}
                        type="button"
                        onClick={() => handleSelectHotspot(spot)}
                        aria-label={`${spot.num}: ${spotText.title}`}
                        aria-pressed={isActive}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono-data text-xs font-bold flex items-center justify-center transition-all duration-200 border-2 ${
                          isActive
                            ? 'bg-[#E8452C] text-[#EDE6D8] border-[#EDE6D8] scale-115'
                            : 'bg-[#141414]/85 text-[#EDE6D8] border-[#EDE6D8]/70 hover:bg-[#0F5E5A] hover:border-[#EDE6D8]'
                        }`}
                      >
                        {spot.num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop / Tablet Readout Bar directly below photo */}
              <div className="relative z-30 border-t border-[#EDE6D8]/15 bg-[#1B1A18] px-5 py-4">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-mono-data text-xs font-bold text-[#E8452C]">
                    {activeHotspot.num} · {activeHotspot.view === 'front' ? t.frontBtn : t.rearBtn}
                  </span>
                </div>
                <h3 className="font-display text-lg text-[#EDE6D8] mb-1">
                  {activeText.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#EDE6D8]/80 leading-relaxed">
                  {activeText.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Right Printed Index List (All 11 Controls & Ports) */}
          <div className="lg:col-span-5 divide-y-2 divide-[#141414] border-y-2 border-[#141414]">
            {HOTSPOT_COORDS.map((spot) => {
              const isActive = spot.num === activeHotspot.num;
              const spotText = t.hotspots[spot.num];
              return (
                <button
                  key={spot.num}
                  type="button"
                  onClick={() => handleSelectHotspot(spot)}
                  className={`w-full text-start p-4 transition-colors flex items-start gap-4 ${
                    isActive
                      ? 'bg-[#141414] text-[#EDE6D8]'
                      : 'bg-transparent text-[#141414] hover:bg-[#E2D9C6]'
                  }`}
                >
                  <span
                    className={`font-mono-data text-xs font-bold px-2 py-1 shrink-0 border ${
                      isActive
                        ? 'bg-[#E8452C] text-[#EDE6D8] border-[#E8452C]'
                        : 'bg-[#EDE6D8] text-[#141414] border-[#141414]'
                    }`}
                  >
                    {spot.num}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
                      <span className="text-sm font-bold">{spotText.title}</span>
                      <span
                        className={`font-mono-data text-[11px] ${
                          isActive ? 'text-[#EDE6D8]/70' : 'text-[#0F5E5A]'
                        }`}
                      >
                        [{spot.view === 'front' ? t.frontBtn : t.rearBtn}]
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isActive ? 'text-[#EDE6D8]/85' : 'text-[#4E4940]'
                      }`}
                    >
                      {spotText.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet for Active Hotspot Description */}
      {mobileSheetOpen && (
        <div
          role="dialog"
          aria-label={activeText.title}
          className="md:hidden fixed bottom-16 inset-x-3 z-50 bg-[#141414] text-[#EDE6D8] border-2 border-[#EDE6D8] p-4 print-shadow-vermilion"
        >
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <span className="font-mono-data text-xs font-bold text-[#E8452C]">
              {activeHotspot.num} · {activeHotspot.view === 'front' ? t.frontBtn : t.rearBtn}
            </span>
            <button
              type="button"
              onClick={() => setMobileSheetOpen(false)}
              aria-label={t.closeNote}
              className="p-1 text-[#EDE6D8]/80 hover:text-[#EDE6D8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-display text-base text-[#EDE6D8] mb-1">
            {activeText.title}
          </h3>
          <p className="text-xs text-[#EDE6D8]/85 leading-relaxed">
            {activeText.detail}
          </p>
        </div>
      )}
    </section>
  );
}
