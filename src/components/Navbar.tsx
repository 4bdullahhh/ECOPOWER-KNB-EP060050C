import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG, buildWhatsAppUrl } from '../config/productConfig';

interface NavbarProps {
  lang: Lang;
  onToggleLang: (next: Lang) => void;
  onScrollToElement: (el: HTMLElement, offset?: number) => void;
  onSetScrollLocked: (locked: boolean) => void;
}

const SECTION_IDS = [
  'unit-tour',
  'calculator',
  'power-flow',
  'specs',
  'faq',
  'contact',
] as const;

type SectionId = (typeof SECTION_IDS)[number];

export function Navbar({
  lang,
  onToggleLang,
  onScrollToElement,
  onSetScrollLocked,
}: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const t = COPY[lang].nav;
  const th = COPY[lang].hero;

  const navLinks: Array<{ id: SectionId; label: string }> = [
    { id: 'unit-tour', label: t.features },
    { id: 'calculator', label: t.calculator },
    { id: 'power-flow', label: t.howItWorks },
    { id: 'specs', label: t.specs },
    { id: 'faq', label: t.faq },
    { id: 'contact', label: t.contact },
  ];

  // Auto-hide navbar on downward scroll + scroll-spy active section highlight
  useEffect(() => {
    let lastY = window.scrollY;

    const updateSpy = () => {
      const y = window.scrollY;

      if (menuOpen) {
        setHidden(false);
      } else if (y > 140 && y > lastY + 8) {
        setHidden(true);
      } else if (y < lastY - 8 || y <= 80) {
        setHidden(false);
      }
      lastY = y;

      // Scroll-spy: check if near page bottom first so #contact activates cleanly
      const docHeight = document.documentElement.scrollHeight;
      if (window.innerHeight + y >= docHeight - 48) {
        setActiveId('contact');
        return;
      }

      const headerHeight = headerRef.current ? headerRef.current.getBoundingClientRect().height : 60;
      const threshold = headerHeight + 80;
      let current: SectionId | null = null;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      setActiveId(current);
    };

    updateSpy();
    window.addEventListener('scroll', updateSpy, { passive: true });
    window.addEventListener('resize', updateSpy, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateSpy);
      window.removeEventListener('resize', updateSpy);
    };
  }, [menuOpen]);

  // Lock body / Lenis scroll while mobile drawer is open
  useEffect(() => {
    onSetScrollLocked(menuOpen);
    return () => {
      onSetScrollLocked(false);
    };
  }, [menuOpen, onSetScrollLocked]);

  // Close mobile menu on outside tap, Escape, or hashchange / popstate
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (headerRef.current?.contains(target) || menuPanelRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };
    const onRouteChange = () => setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('hashchange', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('hashchange', onRouteChange);
      window.removeEventListener('popstate', onRouteChange);
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    setMenuOpen(false);
    onSetScrollLocked(false);

    const headerHeight = headerRef.current ? headerRef.current.getBoundingClientRect().height : 60;
    // Wait one animation frame if closing mobile menu restored scroll first
    window.requestAnimationFrame(() => {
      onScrollToElement(target, -(headerHeight + 4));
      try {
        window.history.replaceState(null, '', `#${targetId}`);
      } catch {
        // Ignore history restriction in sandboxed iframes
      }
    });
  };

  const whatsappHref = buildWhatsAppUrl(COPY[lang].contact.prefillMessage);
  const telHref = `tel:${PRODUCT_CONFIG.phone}`;

  return (
    <>
      {/* Strict Printed Top Bar */}
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-[70] bg-[#EDE6D8]/95 backdrop-blur-sm border-b-2 border-[#141414] transition-transform duration-300 ease-out ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-1.5 sm:gap-4 lg:gap-6">
          {/* Zone 1: Single wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-display text-sm sm:text-xl tracking-tight text-[#141414] whitespace-nowrap shrink-0"
          >
            {t.brand}
          </a>

          {/* Zone 2: Desktop concise single-line text links (hidden on <= 767px mobile) */}
          <nav
            aria-label={t.ariaLabel}
            className="hidden md:flex items-center md:gap-3 lg:gap-6 text-xs lg:text-sm font-semibold text-[#4E4940]"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`whitespace-nowrap shrink-0 underline-offset-4 transition-colors ${
                    isActive
                      ? 'text-[#E8452C] underline decoration-2 font-bold'
                      : 'hover:text-[#141414] hover:underline'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Language Switch + primary vermilion CTA + mobile hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div
              role="group"
              aria-label={th.ariaLangToggle}
              className="inline-flex border-2 border-[#141414] bg-[#EDE6D8] text-[#141414]"
            >
              <button
                type="button"
                aria-pressed={lang === 'en'}
                onClick={() => onToggleLang('en')}
                className={`min-h-[34px] sm:min-h-[36px] px-2 sm:px-2.5 py-1 text-[11px] font-mono-data font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation ${
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
                className={`min-h-[34px] sm:min-h-[36px] px-2 sm:px-2.5 py-1 text-[11px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation border-s-2 border-[#141414] ${
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] print-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-transform whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
              <span className="sm:hidden">{t.orderCtaShort}</span>
              <span className="hidden sm:inline">{t.orderCta}</span>
            </a>

            {/* Mobile Hamburger Button (min 44px tap target) */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? t.menuCloseLabel : t.menuOpenLabel}
              className="md:hidden w-11 h-11 flex items-center justify-center border-2 border-[#141414] bg-[#EDE6D8] text-[#141414] hover:bg-[#E2D9C6] transition-colors shrink-0 cursor-pointer touch-manipulation"
            >
              {menuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Drawer & Backdrop */}
      {menuOpen && (
        <>
          <div
            aria-hidden="true"
            className="md:hidden fixed inset-0 top-15 z-[64] bg-[#141414]/45"
          />
          <div
            id="mobile-nav-drawer"
            ref={menuPanelRef}
            className="md:hidden fixed top-15 inset-x-0 z-[65] bg-[#EDE6D8] border-b-2 border-[#141414] print-shadow max-h-[calc(100svh-4rem)] overflow-y-auto"
          >
            <nav
              aria-label={t.mobileMenuAria}
              className="divide-y-2 divide-[#141414] px-4"
            >
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`min-h-[50px] py-3 flex items-center justify-between text-start font-bold text-base transition-colors ${
                      isActive
                        ? 'text-[#E8452C]'
                        : 'text-[#141414] hover:text-[#E8452C]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 bg-[#E8452C] shrink-0"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </>
      )}

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
