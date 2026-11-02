import { type ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    setIsReady(true);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`reveal ${className}`.trim()}
      data-reveal-ready={isReady || undefined}
      data-revealed={isVisible || undefined}
      data-reveal-delay={delay || undefined}
    >
      {children}
    </div>
  );
}
