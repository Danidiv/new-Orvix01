export function Logo({ className = "" }: { className?: string; showText?: boolean }) {
  return (
    <img
      src="/orvixframemedia-logo.svg"
      alt="Orvix Frame Media"
      className={`h-12 w-auto max-w-[220px] object-contain ${className}`}
    />
  );
}
