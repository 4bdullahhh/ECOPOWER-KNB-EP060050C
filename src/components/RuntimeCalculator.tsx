import { useState } from 'react';
import { AlertTriangle, Minus, Plus, Trash2 } from 'lucide-react';
import { COPY, Lang } from '../i18n/translations';
import { PRODUCT_CONFIG } from '../config/productConfig';

interface CalcRow {
  id: string;
  customName?: string;
  watts: number;
  qty: number;
  isDcFriendly?: boolean;
  isCustom?: boolean;
}

interface RuntimeCalculatorProps {
  lang: Lang;
}

export function RuntimeCalculator({ lang }: RuntimeCalculatorProps) {
  const t = COPY[lang].calc;

  const [items, setItems] = useState<CalcRow[]>(() =>
    PRODUCT_CONFIG.appliancePresets.map((p) => ({
      id: p.id,
      watts: p.defaultWatts,
      qty: p.defaultQty,
      isDcFriendly: p.isDcFriendly,
    }))
  );

  const [customName, setCustomName] = useState('');
  const [customWatts, setCustomWatts] = useState('45');
  const [showStandby, setShowStandby] = useState(false);

  const usableWh = Math.round(PRODUCT_CONFIG.capacityWh * PRODUCT_CONFIG.efficiencyFactor);
  const totalWatts = items.reduce(
    (sum, row) => sum + Math.max(0, row.watts) * Math.max(0, row.qty),
    0
  );
  const isOverload = totalWatts > PRODUCT_CONFIG.maxContinuousWatts;
  const clampedRatio = Math.min(1.1, totalWatts / PRODUCT_CONFIG.maxContinuousWatts);

  const totalHours = totalWatts > 0 ? usableWh / totalWatts : 0;
  const hrs = Math.floor(totalHours);
  const mins = Math.round((totalHours - hrs) * 60);
  const normalizedHrs = mins === 60 ? hrs + 1 : hrs;
  const normalizedMins = mins === 60 ? 0 : mins;

  const getRowLabel = (row: CalcRow) =>
    row.isCustom ? row.customName || '' : t.presets[row.id] || row.id;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, qty: Math.max(0, Math.min(20, row.qty + delta)) } : row
      )
    );
  };

  const updateWatts = (id: string, val: string) => {
    const parsed = parseInt(val, 10);
    setItems((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, watts: Number.isNaN(parsed) ? 0 : Math.max(0, Math.min(2000, parsed)) }
          : row
      )
    );
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseInt(customWatts, 10);
    if (!customName.trim() || Number.isNaN(w) || w <= 0) return;
    setItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        customName: customName.trim(),
        watts: Math.min(2000, w),
        qty: 1,
        isCustom: true,
      },
    ]);
    setCustomName('');
    setCustomWatts('45');
  };

  const removeCustom = (id: string) => {
    setItems((prev) => prev.filter((row) => row.id !== id));
  };

  // Analog Watt Meter Needle Angle: -110 deg (0 W) to +110 deg (550 W)
  const needleAngle = -110 + (clampedRatio / 1.1) * 220;

  return (
    <section
      id="calculator"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Printed Appliance Ledger */}
          <div className="lg:col-span-7 bg-[#EDE6D8] border-2 border-[#141414] print-shadow">
            <div className="divide-y-2 divide-[#141414]">
              {items.map((item) => {
                const label = getRowLabel(item);
                return (
                  <div
                    key={item.id}
                    className="p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-sm sm:text-base font-bold text-[#141414]">
                        {label}
                      </span>
                      {item.isDcFriendly && (
                        <span className="ms-2 font-mono-data text-[11px] font-bold text-[#0F5E5A]">
                          {t.dcBadge}
                        </span>
                      )}
                    </div>

                    {/* Editable Watts */}
                    <div className="flex items-center gap-1.5">
                      <label htmlFor={`watts-${item.id}`} className="sr-only">
                        {label} {t.watts}
                      </label>
                      <input
                        id={`watts-${item.id}`}
                        type="number"
                        min={0}
                        max={2000}
                        value={item.watts}
                        onChange={(e) => updateWatts(item.id, e.target.value)}
                        className="w-16 px-2 py-1.5 text-right font-mono-data text-sm font-bold bg-[#EDE6D8] border-2 border-[#141414] text-[#141414]"
                      />
                      <span className="font-mono-data text-xs font-bold text-[#4E4940]">
                        {t.watts}
                      </span>
                    </div>

                    {/* Quantity Steppers */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label={`${t.decreaseLabel} ${label}`}
                        onClick={() => updateQty(item.id, -1)}
                        className="w-10 h-10 border-2 border-[#141414] bg-[#EDE6D8] hover:bg-[#141414] hover:text-[#EDE6D8] flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-mono-data text-sm font-bold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`${t.increaseLabel} ${label}`}
                        onClick={() => updateQty(item.id, 1)}
                        className="w-10 h-10 border-2 border-[#141414] bg-[#EDE6D8] hover:bg-[#0F5E5A] hover:text-[#EDE6D8] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {item.isCustom && (
                        <button
                          type="button"
                          aria-label={`${t.removeLabel} ${label}`}
                          onClick={() => removeCustom(item.id)}
                          className="w-9 h-9 text-[#4E4940] hover:text-[#E8452C] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Appliance Bar */}
            <form
              onSubmit={handleAddCustom}
              className="p-4 border-t-2 border-[#141414] bg-[#E2D9C6] flex flex-wrap sm:flex-nowrap items-center gap-3"
            >
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t.customName}
                aria-label={t.customName}
                className="flex-1 min-w-[140px] px-3 py-2 text-sm bg-[#EDE6D8] border-2 border-[#141414] text-[#141414] placeholder:text-[#4E4940]"
              />
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={1}
                  max={2000}
                  value={customWatts}
                  onChange={(e) => setCustomWatts(e.target.value)}
                  aria-label={t.customWattsAria}
                  className="w-20 px-2.5 py-2 text-right font-mono-data text-sm font-bold bg-[#EDE6D8] border-2 border-[#141414]"
                />
                <span className="font-mono-data text-xs font-bold">{t.watts}</span>
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-[#141414] text-[#EDE6D8] border-2 border-[#141414] hover:bg-[#0F5E5A] transition-colors whitespace-nowrap shrink-0"
              >
                {t.addCustom}
              </button>
            </form>
          </div>

          {/* Right Analog-Style Industrial Meter & Readout */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 bg-[#EDE6D8] border-2 border-[#141414] print-shadow p-6 sm:p-8 space-y-6">
            {/* Big Analog Wattage Dial */}
            <div className="border-2 border-[#141414] bg-[#141414] text-[#EDE6D8] p-5 flex flex-col items-center">
              <svg viewBox="0 0 240 150" className="w-full max-w-[260px] overflow-visible">
                {/* Outer Arc */}
                <path
                  d="M 30 125 A 90 90 0 1 1 210 125"
                  fill="none"
                  stroke="#EDE6D8"
                  strokeOpacity="0.22"
                  strokeWidth="10"
                  strokeLinecap="butt"
                />
                {/* Safe Teal Zone (0 - 400 W) */}
                <path
                  d="M 30 125 A 90 90 0 0 1 188 55"
                  fill="none"
                  stroke="#0F5E5A"
                  strokeWidth="10"
                />
                {/* Red Overload Zone (500 W+) */}
                <path
                  d="M 196 67 A 90 90 0 0 1 210 125"
                  fill="none"
                  stroke="#E8452C"
                  strokeWidth="10"
                />

                {/* Scale Ticks */}
                {[0, 100, 200, 300, 400, 500].map((val) => {
                  const ratio = val / 550;
                  const deg = -110 + ratio * 220;
                  const rad = ((deg - 90) * Math.PI) / 180;
                  const x1 = 120 + Math.cos(rad) * 72;
                  const y1 = 120 + Math.sin(rad) * 72;
                  const x2 = 120 + Math.cos(rad) * 84;
                  const y2 = 120 + Math.sin(rad) * 84;
                  return (
                    <line
                      key={val}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={val === 500 ? '#E8452C' : '#EDE6D8'}
                      strokeWidth={val === 500 ? '2.5' : '1.5'}
                    />
                  );
                })}

                {/* Analog Needle */}
                <g
                  style={{
                    transform: `rotate(${needleAngle}deg)`,
                    transformOrigin: '120px 120px',
                    transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <line x1="120" y1="120" x2="120" y2="38" stroke="#E8452C" strokeWidth="3.5" />
                  <circle cx="120" cy="120" r="7" fill="#EDE6D8" />
                </g>

                <text
                  x="120"
                  y="144"
                  textAnchor="middle"
                  className="font-mono-data fill-[#EDE6D8] text-[13px] font-bold"
                >
                  {totalWatts} {t.watts} / {PRODUCT_CONFIG.maxContinuousWatts} {t.watts} {t.maxLabel}
                </text>
              </svg>
            </div>

            {/* Big Runtime Sentence */}
            <div className="border-b-2 border-[#141414] pb-5">
              <div className="font-mono-data text-xs font-bold uppercase tracking-wider text-[#4E4940] mb-1">
                {t.estimatedTime}
              </div>
              {totalWatts === 0 ? (
                <p className="text-lg font-bold text-[#4E4940]">{t.idleText}</p>
              ) : (
                <p className="font-display text-3xl sm:text-4xl text-[#141414] leading-tight">
                  {t.roughly}{' '}
                  <span className="text-[#0F5E5A]">
                    {normalizedHrs} {t.hrs} {normalizedMins} {t.min}
                  </span>
                </p>
              )}
            </div>

            {/* 500 W Overload Alert */}
            {isOverload && (
              <div
                role="alert"
                className="p-4 bg-[#E8452C] text-[#EDE6D8] border-2 border-[#141414] flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-sm font-bold">{t.overloadTitle}</div>
                  <p className="text-xs leading-relaxed mt-0.5">{t.overloadBody}</p>
                </div>
              </div>
            )}

            {/* 12V DC Bonus + Estimate Disclaimer */}
            <div className="space-y-2.5 text-xs leading-relaxed">
              <p className="font-semibold text-[#0F5E5A]">{t.dcNote}</p>
              <p className="text-[#4E4940]">{t.disclaimer}</p>
            </div>

            {/* STANDBY Mode Note */}
            <div className="pt-3 border-t-2 border-[#141414]">
              <button
                type="button"
                aria-expanded={showStandby}
                onClick={() => setShowStandby((v) => !v)}
                className="w-full flex items-center justify-between text-start text-xs font-mono-data font-bold text-[#141414] hover:text-[#E8452C]"
              >
                <span>{t.standbyNoteTitle}</span>
                <span>{showStandby ? '−' : '+'}</span>
              </button>
              {showStandby && (
                <p className="mt-2.5 text-xs text-[#4E4940] leading-relaxed">{t.standbyNoteBody}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
