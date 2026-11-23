import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COPY, Lang } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface ProblemStripProps {
  lang: Lang;
}

export function ProblemStrip({ lang }: ProblemStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const t = COPY[lang].problem;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;

    const setupScroll = () => {
      if (cancelled) return;
      ctx?.revert();

      ctx = gsap.context(() => {
        gsap.set(track, { x: 0 });

        const getDistance = () => Math.max(0, track.offsetWidth - section.clientWidth);
        const isRtl = lang === 'ur';

        if (getDistance() <= 0) return;

        gsap.to(track, {
          x: () => (isRtl ? getDistance() : -getDistance()),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    setupScroll();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      ctx?.revert();
    };
  }, [lang]);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] overflow-hidden min-h-[100svh] flex flex-col justify-center py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 mb-8 lg:mb-12">
        <span className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C]">
          {t.kicker}
        </span>
      </div>

      {/* 5-Frame Horizontal Strip — One Huge Line Per Frame, No Icons */}
      <div className="w-full overflow-x-auto motion-safe:overflow-visible no-scrollbar">
        <div
          ref={trackRef}
          className="flex w-max gap-0 px-6 sm:px-10 lg:px-16"
        >
          {t.frames.map((frame) => (
            <article
              key={frame.num}
              className="shrink-0 w-[86vw] sm:w-[480px] lg:w-[600px] border-2 border-[#141414] -ms-[2px] first:ms-0 bg-[#E2D9C6] p-8 sm:p-10 flex flex-col justify-between min-h-[300px] sm:min-h-[360px]"
            >
              <div className="flex items-baseline justify-between border-b-2 border-[#141414] pb-4 mb-8">
                <span className="font-display text-4xl sm:text-5xl text-[#141414]">
                  {frame.num}
                </span>
                <span className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#0F5E5A]">
                  {frame.place}
                </span>
              </div>

              <h2
                className="font-display text-[#141414] leading-[0.98] tracking-tight"
                style={{
                  fontSize: 'clamp(2rem, 4.2vw, 3.6rem)',
                  textWrap: 'balance',
                }}
              >
                {frame.line}
              </h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
