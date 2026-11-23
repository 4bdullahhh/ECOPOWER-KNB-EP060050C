import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG, buildWhatsAppUrl } from '../config/productConfig';

interface NavbarProps {
  lang: Lang;
  onToggleLang: (next: Lang) => void;
}

export function Navbar({ lang, onToggleLang }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const t = COPY[lang].nav;
  const th = COPY[lang].hero;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 140 && y > lastY + 8) {
        setHidden(true);
      } else if (y < lastY - 8 || y <= 80) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHref = buildWhatsAppUrl(COPY[lang].contact.prefillMessage);
  const telHref = `tel:${PRODUCT_CONFIG.phone}`;

  return (
    <>
      {/* Strict 3-Zone Printed Top Bar */}
      <header
        className={`fixed top-0 inset-x-0 z-[70] bg-[#EDE6D8]/95 backdrop-blur-sm border-b-2 border-[#141414] transition-transform duration-300 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Zone 1: Single wordmark */}
          <a
            href="#hero"
            className="font-display text-base sm:text-xl tracking-tight text-[#141414] whitespace-nowrap shrink-0"
          >
            {t.brand}
          </a>

          {/* Zone 2: 5 concise single-line text links */}
          <nav
            aria-label={t.ariaLabel}
            className="hidden md:flex items-center md:gap-3.5 lg:gap-7 text-xs lg:text-sm font-semibold text-[#4E4940]"
          >
            <a
              href="#unit-tour"
              className="hover:text-[#141414] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.features}
            </a>
            <a
              href="#calculator"
              className="hover:text-[#141414] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.calculator}
            </a>
            <a
              href="#power-flow"
              className="hover:text-[#141414] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.howItWorks}
            </a>
            <a
              href="#specs"
              className="hover:text-[#141414] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.specs}
            </a>
            <a
              href="#faq"
              className="hover:text-[#141414] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.faq}
            </a>
          </nav>

          {/* Zone 3: Language Switch + 1 primary vermilion CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              role="group"
              aria-label={th.ariaLangToggle}
              className="inline-flex border-2 border-[#141414] bg-[#EDE6D8] text-[#141414]"
            >
              <button
                type="button"
                aria-pressed={lang === 'en'}
                onClick={() => onToggleLang('en')}
                className={`px-2 sm:px-2.5 py-1.5 text-[11px] font-mono-data font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation ${
                  lang === 'en'
                    ? 'bg-[#141414] text-[#EDE6D8]'
                    : 'bg-[#EDE6D8] text-[#141414] hover:bg-[#E2D9C6]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={lang === 'ur'}
                onClick={() => onToggleLang('ur')}
                className={`px-2 sm:px-2.5 py-1.5 text-[11px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation border-s-2 border-[#141414] ${
                  lang === 'ur'
                    ? 'bg-[#141414] text-[#EDE6D8]'
                    : 'bg-[#EDE6D8] text-[#141414] hover:bg-[#E2D9C6]'
                }`}
              >
                اردو
              </button>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnetic"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-[11px] sm:text-sm font-bold bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] print-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-transform whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
              <span>{t.orderCta}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile-only Sticky Bottom WhatsApp + Call Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-2 bg-[#EDE6D8] border-t-2 border-[#141414] grid grid-cols-2 gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 flex items-center justify-center gap-1.5 bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] print-shadow-sm font-bold text-xs whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.orderCta}</span>
        </a>
        <a
          href={telHref}
          className="h-11 flex items-center justify-center gap-1.5 bg-[#141414] text-[#EDE6D8] border-2 border-[#141414] font-bold text-xs whitespace-nowrap"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.callCta}</span>
        </a>
      </div>
    </>
  );
}
