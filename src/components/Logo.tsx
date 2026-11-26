export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <img
      src="/orvix-logo.png"
      alt={showText ? "Orvix Frame Media" : "Orvix"}
      className={`h-14 w-auto max-w-[220px] object-contain ${className}`}
      draggable={false}
    />
  );
}
