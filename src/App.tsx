import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COPY, Lang } from './i18n/translations';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroBlackout } from './components/HeroBlackout';
import { ProblemStrip } from './components/ProblemStrip';
import { UnitTour } from './components/UnitTour';
import { RuntimeCalculator } from './components/RuntimeCalculator';
import { PowerFlow } from './components/PowerFlow';
import { SpecSheet } from './components/SpecSheet';
import { HonestComparison } from './components/HonestComparison';
import { MadeInKarachi } from './components/MadeInKarachi';
import { FaqAccordion } from './components/FaqAccordion';
import { FinalCtaAndFooter } from './components/FinalCtaAndFooter';

gsap.registerPlugin(ScrollTrigger);

const LANG_STORAGE_KEY = 'ecopower_lang';

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'ur') return saved;
  } catch {
    // Ignore storage access errors in sandboxed frames
  }
  const navLang = (window.navigator.language || '').toLowerCase();
  return navLang.startsWith('ur') ? 'ur' : 'en';
}

function applyDocumentLocale(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ur' ? 'rtl' : 'ltr';

  document.title = COPY[lang].meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', COPY[lang].meta.description);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', COPY[lang].meta.title);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', COPY[lang].meta.description);
  }
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) {
    twTitle.setAttribute('content', COPY[lang].meta.title);
  }
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) {
    twDesc.setAttribute('content', COPY[lang].meta.description);
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const handleToggleLang = (next: Lang) => {
    if (next === lang) return;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Ignore storage access errors in sandboxed frames
    }
    applyDocumentLocale(next);
    setLang(next);
  };

  // Sync HTML dir, lang, page <title>, meta tags, and refresh ScrollTrigger after DOM & fonts settle
  useEffect(() => {
    applyDocumentLocale(lang);

    let cancelled = false;
    const rafId = window.requestAnimationFrame(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
    };
  }, [lang]);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#EDE6D8] text-[#141414]">
      {/* Subtle printed paper grain overlay */}
      <div aria-hidden="true" className="fixed inset-0 z-[80] paper-grain" />

      <CustomCursor />
      <Navbar lang={lang} onToggleLang={handleToggleLang} />

      <main>
        {/* 1. Hero ("THE CUT") */}
        <HeroBlackout lang={lang} onToggleLang={handleToggleLang} />

        {/* 2. The Problem (Horizontal Scroll Strip) */}
        <ProblemStrip lang={lang} />

        {/* 3. Meet the Unit (Front & Rear Camera Zoom + 11 Hotspots) */}
        <UnitTour lang={lang} />

        {/* 4. Runtime Calculator */}
        <RuntimeCalculator lang={lang} />

        {/* 5. How It Keeps You Powered (Animated Flow + 3-Position Switch + State Table) */}
        <PowerFlow lang={lang} />

        {/* 6. Specs (Confirmed vs TBC) */}
        <SpecSheet lang={lang} />

        {/* 7. Honest Comparison (vs Petrol Generator & Standard UPS) */}
        <HonestComparison lang={lang} />

        {/* 8. Made in Karachi (Kazi & Brothers Heritage + Placeholders) */}
        <MadeInKarachi lang={lang} />

        {/* 9. FAQ Accordion + Critical Safety Warning */}
        <FaqAccordion lang={lang} />

        {/* 10 & 11. Final CTA + Minimal Footer */}
        <FinalCtaAndFooter lang={lang} />
      </main>
    </div>
  );
}
