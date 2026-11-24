import { Mail, MessageCircle, Phone } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG, buildWhatsAppUrl } from '../config/productConfig';

interface FinalCtaAndFooterProps {
  lang: Lang;
}

export function FinalCtaAndFooter({ lang }: FinalCtaAndFooterProps) {
  const t = COPY[lang].contact;
  const tf = COPY[lang].footer;

  const whatsappHref = buildWhatsAppUrl(t.prefillMessage);
  const telHref = `tel:${PRODUCT_CONFIG.phone}`;
  const mailHref = `mailto:${PRODUCT_CONFIG.supportEmail}`;

  return (
    <>
      {/* 10 Direct Contact Call-to-Action (Cream + Black Border + Vermilion Hard-Shadow) */}
      <section
        id="contact"
        className="relative bg-[#E2D9C6] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
          <div className="bg-[#EDE6D8] border-2 border-[#141414] print-shadow p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4">
              <p className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C]">
                {t.kicker}
              </p>
              <h2
                className="font-display text-[#141414] leading-[1.02]"
                style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', textWrap: 'balance' }}
              >
                {t.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#4E4940] leading-relaxed">
                {t.subline}
              </p>
            </div>

            <div className="space-y-4 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] print-shadow font-bold text-base hover:translate-x-[2px] hover:translate-y-[2px] transition-transform whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.whatsappBtn}</span>
                </a>

                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#141414] text-[#EDE6D8] border-2 border-[#141414] print-shadow font-bold text-base hover:bg-[#0F5E5A] transition-colors whitespace-nowrap shrink-0"
                >
                  <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{t.callBtn}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                <p className="font-mono-data text-sm font-bold text-[#141414]">
                  {t.phoneLabel}:{' '}
                  <span dir="ltr" className="inline-block">
                    {PRODUCT_CONFIG.phoneDisplay}
                  </span>
                </p>

                <a
                  href={mailHref}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#E2D9C6] text-[#141414] border-2 border-[#141414] print-shadow-sm font-mono-data text-xs font-bold hover:bg-[#141414] hover:text-[#EDE6D8] transition-colors max-w-full"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="shrink-0">{t.emailLabel}:</span>
                  <span dir="ltr" className="inline-block truncate">
                    {PRODUCT_CONFIG.supportEmail}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 Minimal Printed Colophon Footer */}
      <footer className="bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] pt-10 pb-24 md:pb-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-[#141414]">{tf.line}</p>
            <p className="text-[11px] text-[#4E4940]">{tf.safety}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-data text-xs font-bold text-[#141414]">
            <a
              href={PRODUCT_CONFIG.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8452C] transition-colors"
            >
              {PRODUCT_CONFIG.websiteDisplay}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8452C] transition-colors"
            >
              {tf.whatsappLabel}:{' '}
              <span dir="ltr" className="inline-block">
                {PRODUCT_CONFIG.phoneDisplay}
              </span>
            </a>
            <a href={telHref} className="hover:text-[#0F5E5A] transition-colors">
              {tf.phoneLabel}:{' '}
              <span dir="ltr" className="inline-block">
                {PRODUCT_CONFIG.phoneDisplay}
              </span>
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-1.5 hover:text-[#E8452C] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{tf.emailLabel}:</span>
              <span dir="ltr" className="inline-block">
                {PRODUCT_CONFIG.supportEmail}
              </span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
