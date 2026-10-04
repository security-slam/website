import React from "react";

export interface TextSectionProps {
  title?: string;
  subtitle?: string;
  paragraphs: (string | React.ReactNode)[];
  centered?: boolean;
  textShadow?: boolean;
  maxWidth?: string;
  lastParagraphMargin?: string;
  /** Heading element for the title; the home hero uses h1. */
  titleTag?: "h1" | "h2";
}

export const TextSection: React.FC<TextSectionProps> = ({
  title,
  subtitle,
  paragraphs,
  centered = false,
  textShadow = false,
  maxWidth,
  lastParagraphMargin = "0",
  titleTag: TitleTag = "h2"
}) => {
  const sectionStyle: React.CSSProperties = {
    marginBottom: "var(--gf-space-xl)"
  };

  const paragraphStyle: React.CSSProperties = {
    color: "var(--gf-color-text)",
    lineHeight: 1.8,
    fontSize: "1.25rem",
    marginBottom: "var(--gf-space-md)",
    ...(centered && { textAlign: "center" }),
    ...(textShadow && { textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }),
    ...(maxWidth && {
      maxWidth,
      marginLeft: "auto",
      marginRight: "auto"
    })
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    color: "var(--gf-color-text-subtle)",
    marginBottom: "var(--gf-space-lg)",
    ...(centered && { textAlign: "center" })
  };

  return (
    <section className="text-section" style={sectionStyle}>
      {title && (
        <TitleTag
          style={{
            marginBottom: centered ? "0.5rem" : "var(--gf-space-md)",
            ...(centered && { textAlign: "center" })
          }}
        >
          {title}
        </TitleTag>
      )}
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          style={{
            ...paragraphStyle,
            ...(index === paragraphs.length - 1 && { marginBottom: lastParagraphMargin })
          }}
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
};
