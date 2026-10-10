// Stand-in for a project without a screenshot: framed picture icon over a faint diagonal hatch.
export default function ImagePlaceholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-ink bg-[repeating-linear-gradient(135deg,rgb(216_181_109/0.07)_0_1px,transparent_1px_14px)]"
    >
      <svg viewBox="0 0 64 52" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-16 text-gold-500/70">
        <rect x="1" y="1" width="62" height="50" />
        <rect x="6" y="6" width="52" height="40" strokeOpacity={0.6} />
        <path d="m10 41 13-15 9 10 6-6 16 11" strokeLinejoin="round" />
        <circle cx="43" cy="16" r="4" />
      </svg>
    </div>
  );
}
