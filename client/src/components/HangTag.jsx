import React from 'react';

// A kraft-card swing tag, the kind pinned to garments on a thrift rail.
// Clipped corners at the top, a punched hole and a short loop of string.
// `rows` are [label, value] pairs printed under the hole.
const HangTag = ({ rows = [], size = 'sm', className = '' }) => {
  const large = size === 'lg';

  return (
    <div className={`inline-block ${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`}>
      {/* string loop */}
      {large && (
        <svg
          aria-hidden="true"
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-12 text-stone-700/70"
          viewBox="0 0 40 48"
          fill="none"
        >
          <path d="M20 46 C 8 30, 6 8, 20 4 C 34 8, 32 30, 20 46" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )}

      <div
        className={`relative bg-kraft text-kraft-ink ${large ? 'pt-8 pb-4 px-4 min-w-[148px]' : 'pt-4 pb-1 px-2'}`}
        style={{
          clipPath: large
            ? 'polygon(18% 0, 82% 0, 100% 14%, 100% 100%, 0 100%, 0 14%)'
            : 'polygon(22% 0, 78% 0, 100% 22%, 100% 100%, 0 100%, 0 22%)',
          backgroundImage:
            'repeating-linear-gradient(92deg, rgba(74,59,40,0.035) 0 2px, transparent 2px 5px)',
          boxShadow: 'inset 0 -1px 0 rgba(74,59,40,0.12)',
        }}
      >
        {/* punched hole */}
        <span
          aria-hidden="true"
          className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#FAF7F2] ring-1 ring-kraft-ink/25 ${
            large ? 'top-3 w-3 h-3' : 'top-1.5 w-1.5 h-1.5'
          }`}
        />

        {large ? (
          <dl className="space-y-1">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-kraft-ink/20 pb-1 last:border-0">
                <dt className="text-[11px] text-kraft-ink/70">{label}</dt>
                <dd className="text-xs font-medium tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-[11px] leading-4 font-medium whitespace-nowrap text-center">
            {rows.map(([, value]) => value).join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default HangTag;
