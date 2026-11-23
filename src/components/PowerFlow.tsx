import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';
import { SwitchMode } from './HeroBlackout';

interface PowerFlowProps {
  lang: Lang;
}

export function PowerFlow({ lang }: PowerFlowProps) {
  const [mainsPresent, setMainsPresent] = useState(true);
  const [solarConnected, setSolarConnected] = useState(false);
  const [switchPos, setSwitchPos] = useState<SwitchMode>('STANDBY');
  const t = COPY[lang].flow;

  const isChargingFromWall = mainsPresent;
  const isChargingFromSolar = solarConnected;
  const outputsActive = switchPos === 'ON' || (switchPos === 'STANDBY' && !mainsPresent);

  const activeRowIndex = switchPos === 'ON' ? 0 : switchPos === 'OFF' ? 1 : 2;
  const currentExplanation = mainsPresent
    ? t.rows[activeRowIndex].withMains
    : t.rows[activeRowIndex].withoutMains;

  return (
    <section
      id="power-flow"
      className="relative bg-[#EDE6D8] text-[#141414] border-t-2 border-[#141414] py-20 sm:py-28"
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

        {/* Printed Schematic Box */}
        <div className="bg-[#E2D9C6] border-2 border-[#141414] print-shadow p-6 sm:p-8 mb-10">
          {/* Interactive Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-[#141414]">
            <div className="flex flex-wrap items-center gap-3">
              {/* Mains Toggle */}
              <div
                role="group"
                aria-label={t.ariaMains}
                className="inline-flex border-2 border-[#141414] bg-[#EDE6D8] p-1 gap-1"
              >
                <button
                  type="button"
                  onClick={() => setMainsPresent(true)}
                  className={`px-3.5 py-2 font-mono-data text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    mainsPresent ? 'bg-[#141414] text-[#EDE6D8]' : 'text-[#141414]'
                  }`}
                >
                  {t.mainsOn}
                </button>
                <button
                  type="button"
                  onClick={() => setMainsPresent(false)}
                  className={`px-3.5 py-2 font-mono-data text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    !mainsPresent ? 'bg-[#E8452C] text-[#EDE6D8]' : 'text-[#141414]'
                  }`}
                >
                  {t.mainsOff}
                </button>
              </div>

              {/* Solar Toggle */}
              <button
                type="button"
                aria-pressed={solarConnected}
                onClick={() => setSolarConnected((s) => !s)}
                className={`px-3.5 py-2.5 border-2 border-[#141414] font-mono-data text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  solarConnected
                    ? 'bg-[#0F5E5A] text-[#EDE6D8]'
                    : 'bg-[#EDE6D8] text-[#141414] hover:bg-[#141414] hover:text-[#EDE6D8]'
                }`}
              >
                {solarConnected ? t.solarOn : t.solarOff}
              </button>
            </div>

            {/* 3-Position Switch */}
            <div
              role="radiogroup"
              aria-label={t.ariaSwitch}
              className="inline-flex border-2 border-[#141414] bg-[#141414] p-1 gap-1"
            >
              {(['ON', 'OFF', 'STANDBY'] as SwitchMode[]).map((mode) => {
                const active = switchPos === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSwitchPos(mode)}
                    className={`px-4 py-2 font-mono-data text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? mode === 'STANDBY'
                          ? 'bg-[#E8452C] text-[#EDE6D8]'
                          : mode === 'ON'
                            ? 'bg-[#0F5E5A] text-[#EDE6D8]'
                            : 'bg-[#EDE6D8] text-[#141414]'
                        : 'text-[#EDE6D8]/70 hover:text-[#EDE6D8]'
                    }`}
                  >
                    {t.switchModes[mode]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wall + Solar -> Unit -> Outputs Schematic */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Inputs Column (Wall + Solar) */}
            <div className="md:col-span-3 space-y-3">
              <div
                className={`p-4 border-2 border-[#141414] transition-colors ${
                  isChargingFromWall ? 'bg-[#EDE6D8]' : 'bg-[#EDE6D8]/45 opacity-65'
                }`}
              >
                <div className="font-mono-data text-[11px] font-bold text-[#0F5E5A]">
                  {isChargingFromWall ? t.activeInput : t.noMains}
                </div>
                <div className="text-sm font-bold text-[#141414]">{t.wallInput}</div>
              </div>

              <div
                className={`p-4 border-2 border-[#141414] transition-colors ${
                  isChargingFromSolar ? 'bg-[#EDE6D8]' : 'bg-[#EDE6D8]/45 opacity-65'
                }`}
              >
                <div className="font-mono-data text-[11px] font-bold text-[#0F5E5A]">
                  {isChargingFromSolar ? t.solarCharging : t.optionalSolar}
                </div>
                <div className="text-sm font-bold text-[#141414]">{t.solarInput}</div>
              </div>
            </div>

            {/* Arrow Input -> Unit */}
            <div className="md:col-span-1 flex items-center justify-center">
              <svg viewBox="0 0 80 24" className="w-20 h-6 rotate-90 md:rotate-0 rtl:md:rotate-180">
                <line
                  x1="4"
                  y1="12"
                  x2="76"
                  y2="12"
                  stroke={isChargingFromWall || isChargingFromSolar ? '#0F5E5A' : '#141414'}
                  strokeOpacity={isChargingFromWall || isChargingFromSolar ? 1 : 0.25}
                  strokeWidth="3"
                  strokeDasharray="6 5"
                >
                  {(isChargingFromWall || isChargingFromSolar) && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="22"
                      to="0"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              </svg>
            </div>

            {/* Center Unit */}
            <div className="md:col-span-3 p-5 border-2 border-[#141414] bg-[#141414] text-[#EDE6D8] text-center">
              <div className="font-mono-data text-xs font-bold text-[#E8452C] mb-1">
                {t.switchPrefix}: {t.switchModes[switchPos]}
              </div>
              <div className="font-display text-sm sm:text-base mb-1">{t.unitBox}</div>
              <div className="font-mono-data text-[11px] text-[#EDE6D8]/75">
                {isChargingFromWall || isChargingFromSolar ? t.chargingStatus : t.batteryOnlyStatus}
              </div>
            </div>

            {/* Arrow Unit -> Loads */}
            <div className="md:col-span-1 flex items-center justify-center">
              <svg viewBox="0 0 80 24" className="w-20 h-6 rotate-90 md:rotate-0 rtl:md:rotate-180">
                <line
                  x1="4"
                  y1="12"
                  x2="76"
                  y2="12"
                  stroke={outputsActive ? '#E8452C' : '#141414'}
                  strokeOpacity={outputsActive ? 1 : 0.25}
                  strokeWidth="3"
                  strokeDasharray="6 5"
                >
                  {outputsActive && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="22"
                      to="0"
                      dur="0.65s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              </svg>
            </div>

            {/* Outputs */}
            <div
              className={`md:col-span-3 p-5 border-2 border-[#141414] transition-colors ${
                outputsActive ? 'bg-[#0F5E5A] text-[#EDE6D8]' : 'bg-[#EDE6D8]/50 text-[#4E4940]'
              }`}
            >
              <div className="font-mono-data text-[11px] font-bold mb-1">
                {outputsActive ? t.outputsOnStatus : t.outputsOffStatus}
              </div>
              <div className="text-sm font-bold">{t.loadBox}</div>
            </div>
          </div>

          {/* Live State Sentence */}
          <div className="p-4 border-2 border-[#141414] bg-[#EDE6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm font-bold text-[#141414]">{currentExplanation}</p>
            <span className="font-mono-data text-xs font-bold text-[#E8452C] shrink-0">
              {mainsPresent ? t.mainsOnTag : t.mainsCutTag} · {t.switchModes[switchPos]}
            </span>
          </div>
        </div>

        {/* Honest Not-a-UPS Warning */}
        <div className="mb-10 p-4 border-2 border-[#141414] bg-[#E8452C] text-[#EDE6D8] flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm font-bold leading-relaxed">{t.notUpsNote}</p>
        </div>

        {/* Printed 3x2 State Matrix */}
        <div className="overflow-x-auto border-2 border-[#141414] bg-[#EDE6D8]">
          <table className="w-full text-start border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-[#141414] bg-[#141414] text-[#EDE6D8] font-mono-data text-xs">
                {t.tableHeaders.map((head) => (
                  <th key={head} className="py-3.5 px-5 text-start font-bold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, idx) => {
                const selected = idx === activeRowIndex;
                return (
                  <tr
                    key={row.mode}
                    className={`border-b last:border-b-0 border-[#141414] ${
                      selected ? 'bg-[#E2D9C6]' : ''
                    }`}
                  >
                    <td className="py-4 px-5 font-mono-data text-sm font-bold text-[#141414]">
                      {t.switchModesTable[row.mode]}
                    </td>
                    <td className="py-4 px-5 text-sm text-[#4E4940] leading-relaxed">
                      {row.withMains}
                    </td>
                    <td className="py-4 px-5 text-sm font-semibold text-[#141414] leading-relaxed">
                      {row.withoutMains}
                    </td>
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
