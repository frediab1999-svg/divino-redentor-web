import { useIntersection } from "@/hooks/use-intersection";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
};

export function AnimatedSection({ children, className = "", delay = 0 }: Props) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
