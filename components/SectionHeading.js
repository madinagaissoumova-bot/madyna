export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}) {
  return (
    <div className={`section-heading${align === "left" ? " align-left" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
