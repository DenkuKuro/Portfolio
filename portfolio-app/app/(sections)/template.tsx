// Remounts on every section change, so the CSS entrance replays. CSS keyframes (rather than a JS
// animation library) also replay when Next shows a route kept hidden by <Activity> again.
export default function SectionTemplate({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col items-center gap-8">{children}</div>;
}
