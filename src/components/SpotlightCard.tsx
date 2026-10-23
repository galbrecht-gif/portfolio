import { useRef, useState, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  color?: string;
}

export default function SpotlightCard({ children, className = "", color = "rgba(16,185,129,0.18)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`glass relative overflow-hidden rounded-2xl transition-colors hover:border-white/20 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
