import { COPY, Lang } from '../i18n/translations';

interface HonestComparisonProps {
  lang: Lang;
}

export function HonestComparison({ lang }: HonestComparisonProps) {
  const t = COPY[lang].comparison;

  return (
    <section
      id="comparison"
      className="relative bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10">
        <div className="max-w-2xl mb-12">
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

        <div className="overflow-x-auto border-2 border-[#141414] bg-[#EDE6D8] print-shadow">
          <table className="w-full text-start border-collapse min-w-[660px]">
            <thead>
              <tr className="border-b-2 border-[#141414] bg-[#141414] text-[#EDE6D8] font-mono-data text-xs">
                {t.columns.map((col, idx) => (
                  <th
                    key={col}
                    className={`py-4 px-5 text-start font-bold ${
                      idx === 1 ? 'bg-[#0F5E5A] text-[#EDE6D8]' : ''
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, rIdx) => {
                const isLast = rIdx === t.rows.length - 1;
                return (
                  <tr
                    key={row[0]}
                    className="border-b last:border-b-0 border-[#141414]/40"
                  >
                    <td className="py-4 px-5 text-sm font-bold text-[#141414]">{row[0]}</td>
                    <td
                      className={`py-4 px-5 text-sm font-bold bg-[#0F5E5A]/10 ${
                        isLast ? 'text-[#E8452C]' : 'text-[#0F5E5A]'
                      }`}
                    >
                      {row[1]}
                    </td>
                    <td className="py-4 px-5 text-sm text-[#4E4940]">{row[2]}</td>
                    <td className="py-4 px-5 text-sm text-[#4E4940]">{row[3]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
