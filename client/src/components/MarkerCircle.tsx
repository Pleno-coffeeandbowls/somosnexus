// NEXUS — MarkerCircle
// Círculo SVG estilo marcador a mano que se "dibuja" al entrar en viewport
// Uso: <MarkerCircle color="#A855F7"><span>palabra clave</span></MarkerCircle>

import { useEffect, useRef, useState } from "react";

interface MarkerCircleProps {
  children: React.ReactNode;
  color?: string;
  delay?: number; // ms
  type?: "circle" | "underline" | "highlight";
}

export default function MarkerCircle({
  children,
  color = "#EC4899",
  delay = 0,
  type = "circle",
}: MarkerCircleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setDrawn(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      {type === "circle" && (
        <svg
          className="absolute pointer-events-none"
          style={{
            top: "-12%",
            left: "-8%",
            width: "116%",
            height: "130%",
            overflow: "visible",
          }}
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          fill="none"
        >
          <ellipse
            cx="50"
            cy="20"
            rx="46"
            ry="17"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: drawn ? 0 : 1,
              transition: drawn ? `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)` : "none",
              transform: "rotate(-2deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
      )}
      {type === "underline" && (
        <svg
          className="absolute pointer-events-none"
          style={{
            bottom: "-4px",
            left: "-4%",
            width: "108%",
            height: "10px",
            overflow: "visible",
          }}
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M2,6 Q25,2 50,6 Q75,10 98,5"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: drawn ? 0 : 1,
              transition: drawn ? `stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)` : "none",
            }}
          />
        </svg>
      )}
      {type === "highlight" && (
        <span
          className="absolute inset-0 -z-10 rounded-sm"
          style={{
            background: color + "22",
            transform: drawn ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: drawn ? `transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms` : "none",
          }}
        />
      )}
    </span>
  );
}
