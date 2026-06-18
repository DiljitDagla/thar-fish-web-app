export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-chart-2/60" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="max-w-2xl text-white animate-fade-in-up">
          <h1 className="text-4xl font-extrabold leading-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
