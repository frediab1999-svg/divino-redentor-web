type Props = { eyebrow?: string; title: string; subtitle?: string; center?: boolean };

export function SectionTitle({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-gold mb-3">{eyebrow}</p>}
      <h2 className="font-display text-primary text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px w-16 bg-gold ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
