import React from "react";

export interface SectionCardProps {
  id?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  description,
  children
}) => {
  return (
    <div
      id={id}
      className="link-card"
      style={{
        padding: "var(--gf-space-xl)",
        backgroundColor: "var(--gf-color-surface)",
        borderRadius: "var(--gf-radius-xl)",
        boxShadow: "var(--gf-shadow-surface)",
        backdropFilter: "var(--gf-glass-blur)",
        WebkitBackdropFilter: "var(--gf-glass-blur)",
        border: "1px solid var(--gf-color-border-strong)"
      }}
    >
      <h3>{title}</h3>
      <p
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.7,
          fontSize: "1.1rem"
        }}
      >
        {description}
      </p>
      {children}
    </div>
  );
};
