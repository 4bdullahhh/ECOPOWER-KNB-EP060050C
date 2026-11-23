import { useState } from 'react';
import { ChevronDown, AlertOctagon } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';

interface FaqAccordionProps {
  lang: Lang;
}

export function FaqAccordion({ lang }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = COPY[lang].faq;

  return (
    <section
      id="faq"
      className="relative bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Title + Vermilion Critical Safety & Flicker Warning */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <div>
              <p className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C] mb-3">
                {t.kicker}
              </p>
              <h2
                className="font-display text-[#141414] leading-[1.02]"
                style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
              >
                {t.title}
              </h2>
            </div>

            <div
              role="note"
              className="p-5 bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] print-shadow space-y-2"
            >
              <div className="flex items-center gap-2 text-sm font-bold">
                <AlertOctagon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{t.safetyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">{t.safetyBody}</p>
            </div>
          </div>

          {/* Right Printed 8-Item Accordion */}
          <div className="lg:col-span-7 divide-y-2 divide-[#141414] border-y-2 border-[#141414]">
            {t.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-start group"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#141414] group-hover:text-[#E8452C] transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#141414] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E8452C]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-[#4E4940] leading-relaxed pe-6">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
