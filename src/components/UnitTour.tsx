import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { COPY, HOTSPOT_COORDS, HotspotCoord, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG } from '../config/productConfig';

interface UnitTourProps {
  lang: Lang;
  onScrollToElement?: (el: HTMLElement, offset?: number) => void;
}

export function UnitTour({ lang, onScrollToElement }: UnitTourProps) {
  const [view, setView] = useState<'front' | 'rear'>('front');
  const [selectedNum, setSelectedNum] = useState<string>('01');
  const [zoomed, setZoomed] = useState(false);
  const [imgBoxSize, setImgBoxSize] = useState<{ width: number; height: number } | null>(null);

  const viewerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const zoomTimerRef = useRef<number | null>(null);

  const t = COPY[lang].tour;
  const visibleHotspots = HOTSPOT_COORDS.filter((h) => h.view === view);
  const activeHotspot: HotspotCoord =
    HOTSPOT_COORDS.find((h) => h.num === selectedNum) || visibleHotspots[0];
  const activeText = t.hotspots[activeHotspot.num];
  const isActiveOnCurrentView = activeHotspot.view === view;

  // Measure the photo stage so the inner image box always fits inside ~45-55vh on mobile/tablet
  // with exact aspect-ratio (object-fit: contain semantics) and zero letterbox coordinate drift.
  const measureStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (window.innerWidth >= 1024) {
      setImgBoxSize(null);
      return;
    }

    const styles = window.getComputedStyle(stage);
    const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const availW = Math.max(120, stage.clientWidth - padX);
    const availH = Math.max(120, stage.clientHeight - padY);
    const aspect = view === 'front' ? 1080 / 670 : 1000 / 620;

    const width = Math.min(availW, availH * aspect);
    const height = width / aspect;

    setImgBoxSize((prev) =>
      prev && Math.abs(prev.width - width) < 0.5 && Math.abs(prev.height - height) < 0.5
        ? prev
        : { width, height }
    );
  }, [view]);

  useEffect(() => {
    measureStage();

    const stage = stageRef.current;
    const ro = stage && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureStage) : null;
    if (ro && stage) ro.observe(stage);

    window.addEventListener('resize', measureStage, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measureStage);
    };
  }, [measureStage, lang]);

  useEffect(() => {
    return () => {
      if (zoomTimerRef.current) window.clearTimeout(zoomTimerRef.current);
    };
  }, []);

  const focusHotspot = (spot: HotspotCoord, scrollIfNeeded: boolean) => {
    if (zoomTimerRef.current) {
      window.clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }

    const viewerEl = viewerRef.current;
    let scrolled = false;

    if (scrollIfNeeded && viewerEl) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 60;
      const topPad = headerHeight + 8;
      const bottomReserve = window.innerWidth < 768 ? 64 : 12;
      const rect = viewerEl.getBoundingClientRect();

      const isFullyVisible =
        rect.top >= topPad - 4 && rect.bottom <= window.innerHeight - bottomReserve + 4;

      if (!isFullyVisible) {
        scrolled = true;
        if (onScrollToElement) {
          onScrollToElement(viewerEl, -topPad);
        } else {
          const top = window.scrollY + rect.top - topPad;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }
    }

    setView(spot.view);
    setSelectedNum(spot.num);

    if (scrolled) {
      setZoomed(false);
      zoomTimerRef.current = window.setTimeout(() => {
        setZoomed(true);
      }, 150);
    } else {
      setZoomed(true);
    }
  };

  const handleStep = (delta: 1 | -1) => {
    const idx = HOTSPOT_COORDS.findIndex((h) => h.num === selectedNum);
    const currentIdx = idx === -1 ? 0 : idx;
    const nextIdx = (currentIdx + delta + HOTSPOT_COORDS.length) % HOTSPOT_COORDS.length;
    focusHotspot(HOTSPOT_COORDS[nextIdx], false);
  };

  const handleSwitchView = (nextView: 'front' | 'rear') => {
    if (zoomTimerRef.current) {
      window.clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }
    setView(nextView);
    setZoomed(false);
    const first = HOTSPOT_COORDS.find((h) => h.view === nextView);
    if (first) setSelectedNum(first.num);
  };

  const handleReset = () => {
    if (zoomTimerRef.current) {
      window.clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }
    setZoomed(false);
  };

  // Keyboard navigation: ArrowLeft/Up & ArrowRight/Down to step hotspots, Escape to reset view
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleReset();
      return;
    }
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp'
    ) {
      const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      e.preventDefault();
      handleStep(forward ? 1 : -1);
    }
  };

  // Percentage-based camera pan & zoom toward active hotspot, clamped so edges stay inside stage
  const zoomTransform = (() => {
    if (!zoomed || !isActiveOnCurrentView) return 'scale(1) translate(0%, 0%)';
    const scale = 1.48;
    const maxPan = ((scale - 1) / (2 * scale)) * 100; // ~16.2% of image box
    const dx = Math.max(-maxPan, Math.min(maxPan, 50 - activeHotspot.x));
    const dy = Math.max(-maxPan, Math.min(maxPan, 50 - activeHotspot.y));
    return `scale(${scale}) translate(${dx.toFixed(2)}%, ${dy.toFixed(2)}%)`;
  })();

  return (
    <section
      id="unit-tour"
      onKeyDown={handleKeyDown}
      className="relative bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header + Front/Rear Toggle + Reset */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 lg:pb-10 border-b-2 border-[#141414] mb-8 lg:mb-12">
          <div className="max-w-2xl">
            <p className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C] mb-3">
              {t.kicker}
            </p>
            <h2
              className="font-display text-[#141414] leading-[1.02] mb-3"
              style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
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
                className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
                className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono-data font-bold border-2 border-[#141414] bg-[#EDE6D8] text-[#141414] hover:bg-[#E8452C] hover:text-[#EDE6D8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.resetBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Stacked normal-flow on mobile/tablet; sticky 12-col split layout on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Blueprint Photo Viewer (Normal flow above list on <= 768px/mobile, sticky left on desktop) */}
          <div
            ref={viewerRef}
            className="w-full lg:col-span-7 relative lg:sticky lg:top-20 z-20"
          >
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

              {/* Top blueprint metadata & Prev / Next / Reset controls bar */}
              <div className="relative z-30 px-3 sm:px-4 py-2 border-b border-[#EDE6D8]/15 bg-[#141414]/90 flex items-center justify-between gap-2 text-[11px] font-mono-data text-[#EDE6D8]/80">
                <span className="truncate min-w-0">
                  {PRODUCT_CONFIG.model} · {view === 'front' ? t.frontBtn : t.rearBtn}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="hidden xl:inline text-[#EDE6D8]/60 me-2">{t.kbHint}</span>

                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    aria-label={t.prevBtn}
                    className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center border border-[#EDE6D8]/35 bg-[#1B1A18] text-[#EDE6D8] hover:border-[#E8452C] hover:bg-[#E8452C] transition-colors cursor-pointer touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  </button>

                  <span dir="ltr" className="px-1 text-[11px] font-bold text-[#EDE6D8]">
                    {activeHotspot.num}/{String(HOTSPOT_COORDS.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    aria-label={t.nextBtn}
                    className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center border border-[#EDE6D8]/35 bg-[#1B1A18] text-[#EDE6D8] hover:border-[#E8452C] hover:bg-[#E8452C] transition-colors cursor-pointer touch-manipulation"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  </button>

                  {zoomed && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="ms-1 inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold border border-[#E8452C] bg-[#E8452C] text-[#EDE6D8] hover:bg-[#EDE6D8] hover:text-[#141414] transition-colors whitespace-nowrap cursor-pointer touch-manipulation"
                    >
                      <RotateCcw className="w-3 h-3" aria-hidden="true" />
                      <span>{t.resetBtn}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Camera Zoom Stage (LTR-locked so photo hotspot coordinates match hardware) */}
              <div
                ref={stageRef}
                dir="ltr"
                className="relative h-[38svh] sm:h-[40svh] min-h-[210px] max-h-[360px] lg:h-auto lg:min-h-0 lg:max-h-none p-2.5 sm:p-5 lg:p-8 flex items-center justify-center overflow-hidden"
              >
                <div
                  style={
                    imgBoxSize
                      ? { width: `${imgBoxSize.width}px`, height: `${imgBoxSize.height}px` }
                      : undefined
                  }
                  className={`relative shrink-0 ${imgBoxSize ? '' : 'w-full'}`}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: zoomTransform, transformOrigin: '50% 50%' }}
                  >
                    <img
                      src={
                        view === 'front'
                          ? PRODUCT_CONFIG.assets.frontCutout
                          : PRODUCT_CONFIG.assets.rearCutout
                      }
                      alt={view === 'front' ? t.altFront : t.altRear}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain block relative z-10 select-none"
                    />

                    {/* Spotlight Dimming Overlay when a hotspot is focused */}
                    {zoomed && isActiveOnCurrentView && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-15 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(ellipse 14% 22.5% at ${activeHotspot.x}% ${activeHotspot.y}%, rgba(20,20,20,0) 0%, rgba(20,20,20,0) 45%, rgba(20,20,20,0.72) 100%)`,
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

                    {/* Floating Translucent HUD Callout over real photo (tablet/desktop) */}
                    {isActiveOnCurrentView && (
                      <div
                        style={{ left: `${activeHotspot.lx}%`, top: `${activeHotspot.ly}%` }}
                        className="hidden sm:block absolute z-25 -translate-x-1/2 -translate-y-1/2 pointer-events-none photo-hud px-2.5 py-1 text-[10px] font-mono-data font-bold text-[#EDE6D8] whitespace-nowrap"
                      >
                        <span className="text-[#E8452C] me-1.5">{activeHotspot.num}</span>
                        <span>{activeText.shortTag}</span>
                      </div>
                    )}

                    {/* Numbered Interactive Hotspots (min 44x44px tap box on mobile/tablet) */}
                    {visibleHotspots.map((spot) => {
                      const isActive = spot.num === activeHotspot.num;
                      const spotText = t.hotspots[spot.num];
                      return (
                        <button
                          key={spot.num}
                          type="button"
                          onClick={() => focusHotspot(spot, false)}
                          aria-label={`${spot.num}: ${spotText.title}`}
                          aria-pressed={isActive}
                          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 lg:w-8 lg:h-8 rounded-full flex items-center justify-center cursor-pointer touch-manipulation ${
                            isActive ? 'z-40' : 'z-30'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono-data text-[11px] sm:text-xs font-bold flex items-center justify-center transition-all duration-200 border-2 ${
                              isActive
                                ? 'bg-[#E8452C] text-[#EDE6D8] border-[#EDE6D8] scale-115'
                                : 'bg-[#141414]/85 text-[#EDE6D8] border-[#EDE6D8]/70 hover:bg-[#0F5E5A] hover:border-[#EDE6D8]'
                            }`}
                          >
                            {spot.num}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Hotspot Title & Explanation directly below photo */}
              <div className="relative z-30 border-t border-[#EDE6D8]/15 bg-[#1B1A18] px-3.5 py-2.5 sm:px-5 sm:py-4">
                <div className="flex items-center justify-between gap-3 mb-0.5 sm:mb-1">
                  <span className="font-mono-data text-[11px] sm:text-xs font-bold text-[#E8452C]">
                    {activeHotspot.num} · {activeHotspot.view === 'front' ? t.frontBtn : t.rearBtn}
                  </span>
                </div>
                <h3 className="font-display text-sm sm:text-lg text-[#EDE6D8] mb-0.5 sm:mb-1">
                  {activeText.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#EDE6D8]/85 leading-snug sm:leading-relaxed line-clamp-2 lg:line-clamp-none">
                  {activeText.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Printed Index List (All 11 Controls & Ports) */}
          <div className="w-full lg:col-span-5 divide-y-2 divide-[#141414] border-y-2 border-[#141414]">
            {HOTSPOT_COORDS.map((spot) => {
              const isActive = spot.num === activeHotspot.num;
              const spotText = t.hotspots[spot.num];
              return (
                <button
                  key={spot.num}
                  type="button"
                  onClick={() => focusHotspot(spot, true)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`w-full text-start p-3.5 sm:p-4 transition-colors flex items-start gap-3 sm:gap-4 cursor-pointer touch-manipulation ${
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
    </section>
  );
}
