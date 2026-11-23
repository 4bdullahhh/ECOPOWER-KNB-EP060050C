import { COPY, Lang } from '../i18n/translations';

interface SpecSheetProps {
  lang: Lang;
}

export function SpecSheet({ lang }: SpecSheetProps) {
  const t = COPY[lang].specs;

  return (
    <section
      id="specs"
      className="relative bg-[#E2D9C6] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <div className="max-w-2xl mb-12">
          <p className="font-mono-data text-xs font-bold tracking-[0.16em] text-[#E8452C] mb-3">
            {t.kicker}
          </p>
          <h2
            className="font-display text-[#141414] leading-[1.02] mb-4"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
          >
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#4E4940]">{t.subtitle}</p>
        </div>

        {/* Printed Datasheet Plate */}
        <div className="bg-[#EDE6D8] border-2 border-[#141414] print-shadow overflow-x-auto">
          <table className="w-full text-start border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b-2 border-[#141414] bg-[#141414] text-[#EDE6D8] font-mono-data text-xs">
                <th className="py-3.5 px-5 text-start font-bold w-1/3">
                  {t.tableHeaderLeft}
                </th>
                <th className="py-3.5 px-5 text-start font-bold">
                  {t.tableHeaderRight}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map(([label, value, isConfirmed]) => (
                <tr
                  key={label}
                  className="border-b last:border-b-0 border-[#141414]/35 hover:bg-[#E2D9C6]/60 transition-colors"
                >
                  <td className="py-3.5 px-5 text-xs sm:text-sm font-bold text-[#141414]">
                    {label}
                  </td>
                  <td
                    className={`py-3.5 px-5 font-mono-data text-xs sm:text-sm ${
                      isConfirmed ? 'text-[#141414] font-medium' : 'text-[#E8452C] font-bold'
                    }`}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
