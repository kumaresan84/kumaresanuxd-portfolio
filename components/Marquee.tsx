const items = [
  "UX Strategy",
  "Product Design",
  "Design Systems",
  "Prototyping",
  "User Research",
  "Interaction Design",
  "Usability Testing",
  "Visual Design",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-ink py-4 text-ink-foreground">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg">
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
