import { useEffect, useId } from "react";

export type HubSpotConfig = { portalId: string; formId: string; region: string };

export function HubSpotForm({ config }: { config: HubSpotConfig }) {
  const id = "hs-" + useId().replace(/:/g, "");
  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) return;
    target.innerHTML = "";
    const create = () => (window as any).hbspt?.forms.create({
      ...config,
      target: `#${id}`,
      onFormReady: () => {
        const color = getComputedStyle(target).getPropertyValue("--form-foreground").trim();
        const css = `.hs-form label, .hs-form legend, .hs-form .hs-field-desc, .hs-form .hs-form-radio-display span { color: ${color} !important; }`;
        for (const iframe of target.querySelectorAll("iframe")) {
          const frameDoc = iframe.contentDocument;
          if (!frameDoc) continue;
          const style = frameDoc.createElement("style");
          style.textContent = css;
          frameDoc.head.appendChild(style);
        }
      },
    });
    if ((window as any).hbspt) return void create();
    const s = document.createElement("script");
    s.src = "https://js-na2.hsforms.net/forms/embed/v2.js";
    s.async = true;
    s.onload = create;
    document.body.appendChild(s);
  }, [id, config]);
  return <div id={id} className="form-shell" />;
}
