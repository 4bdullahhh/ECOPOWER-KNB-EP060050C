import { COPY, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG } from '../config/productConfig';

interface MadeInKarachiProps {
  lang: Lang;
}

export function MadeInKarachi({ lang }: MadeInKarachiProps) {
  const t = COPY[lang].karachi;

  return (
    <section
      id="made-in-karachi"
      className="relative bg-[#E2D9C6] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <div className="max-w-4xl space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C] mb-3">
                {t.kicker}
              </p>
              <h2
                className="font-display text-[#141414] leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
              >
                {t.title}
              </h2>
              <p className="font-mono-data text-xs font-bold text-[#0F5E5A]">
                {t.originLine}
              </p>
            </div>

            {/* Rotated Rubber-Stamp Patent Seal */}
            <div className="-rotate-6 border-2 border-[#E8452C] px-3.5 py-2 text-center bg-[#EDE6D8] print-shadow-sm shrink-0">
              <div className="font-mono-data text-[10px] font-bold tracking-widest text-[#E8452C]">
                {t.patentStamp}
              </div>
              <div className="font-mono-data text-xs font-bold text-[#141414]">
                {PRODUCT_CONFIG.model}
              </div>
            </div>
          </div>

          {/* Believable Product Shelf Scene (Rear View + Wall + Contact Shadow) */}
          <div className="relative border-2 border-[#141414] bg-[#EDE6D8] print-shadow overflow-hidden">
            <div className="relative pt-8 px-6 sm:px-10 pb-6 bg-gradient-to-b from-[#EDE6D8] via-[#E7DFCF] to-[#D9CEB8]">
              <div className="relative max-w-[440px] mx-auto">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-2 inset-x-8 h-6 rounded-[100%] blur-md"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(20,20,20,0.5) 0%, rgba(20,20,20,0) 75%)',
                  }}
                />
                <img
                  src={PRODUCT_CONFIG.assets.rearCutout}
                  alt={t.altRearScene}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto relative z-10 select-none"
                />
              </div>
            </div>
            <div className="border-t-2 border-[#141414] bg-[#141414] text-[#EDE6D8] px-5 py-3 flex items-center justify-between gap-4">
              <span className="text-xs font-medium">{t.sceneCaption}</span>
              <span className="font-mono-data text-xs text-[#E8452C] shrink-0">
                {PRODUCT_CONFIG.weightKg}
              </span>
            </div>
          </div>

          {/* Kazi & Brothers Story Placeholder */}
          <div className="p-5 border-2 border-[#141414] bg-[#EDE6D8]">
            <p className="text-sm text-[#4E4940] leading-relaxed">
              {t.storyPlaceholder}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
