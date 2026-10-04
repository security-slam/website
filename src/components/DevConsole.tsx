import React, { useEffect, useRef, useState } from "react";

export const DEV_PREVIEW_KEY = "dev-preview";

export interface DevConsoleProps {
  onCommand: (command: string) => void;
}

/** Backtick-toggled terminal overlay. Enter submits the typed line to `onCommand`. */
export const DevConsole: React.FC<DevConsoleProps> = ({ onCommand }) => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }
      if (e.key !== "`") return;
      const t = e.target as HTMLElement | null;
      // Let the backtick type normally in other inputs (e.g. HubSpot forms).
      if (!open && t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    const cmd = input.value.trim();
    input.value = "";
    if (!cmd) return;
    setLines((l) => [...l, `> ${cmd}`]);
    onCommand(cmd);
  };

  return (
    <div
      role="dialog"
      aria-label="Developer console"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        fontFamily: "monospace",
        padding: "var(--gf-space-lg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <form onSubmit={submit} style={{ display: "flex", gap: "0.5ch" }}>
        <span>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          spellCheck={false}
          aria-label="Console input"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "inherit",
            font: "inherit"
          }}
        />
      </form>
    </div>
  );
};
