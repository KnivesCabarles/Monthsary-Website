import { useMemo } from "react";

export default function FlowerPetals({ count = 20 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        hue: Math.random() > 0.5 ? "#ffb3c6" : "#ff6b8a",
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute -top-6 rounded-tl-full rounded-br-full animate-drift"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.7}px`,
            backgroundColor: p.hue,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
