import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target?: string;
        }) => void;
      };
    };
  }
}

export interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region: string;
  targetId?: string;
}

export const HubSpotForm: React.FC<HubSpotFormProps> = ({
  portalId,
  formId,
  region,
  targetId = "hubspot-form-container"
}) => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formInitializedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);

  const moveFormToContainer = () => {
    const container = formContainerRef.current;
    if (!container) return;

    const allForms = document.querySelectorAll('.hs-form, [class*="hs-form"]');
    allForms.forEach((form) => {
      const formElement = form as HTMLElement;
      if (!container.contains(formElement)) {
        const isHubSpotForm =
          formElement.classList.contains("hs-form") ||
          formElement.querySelector(".hs-form") !== null ||
          formElement.parentElement === document.body ||
          formElement.parentElement?.tagName === "BODY";

        if (isHubSpotForm) {
          container.appendChild(formElement);
        }
      }
    });
  };

  const initializeForm = () => {
    if (!formContainerRef.current || formInitializedRef.current) return;

    const tryInitialize = () => {
      if (
        window.hbspt &&
        formContainerRef.current &&
        !formInitializedRef.current
      ) {
        try {
          formContainerRef.current.innerHTML = "";
          window.hbspt.forms.create({
            portalId,
            formId,
            region,
            target: `#${targetId}`
          });
          formInitializedRef.current = true;
          setTimeout(moveFormToContainer, 500);
        } catch (error) {
          console.error("Error initializing HubSpot form:", error);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(tryInitialize);
    });
  };

  useEffect(() => {
    if (!formContainerRef.current) return;

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (
              element.classList.contains("hs-form") ||
              element.querySelector(".hs-form") !== null ||
              element.querySelector('[class*="hs-"]') !== null
            ) {
              moveFormToContainer();
            }
          }
        });
      });
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true
    });

    const scriptBase = `//js-${region}.hsforms.net/forms/embed/v2.js`;

    if (window.hbspt) {
      initializeForm();
    } else {
      const script = document.createElement("script");
      script.src = scriptBase;
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        setTimeout(initializeForm, 100);
      };
      script.onerror = () => {
        console.error("Failed to load HubSpot forms script");
      };
      document.head.appendChild(script);
    }

    return () => {
      formInitializedRef.current = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      const existingScript = document.querySelector(
        `script[src="${scriptBase}"]`
      );
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [portalId, formId, region, targetId]);

  return (
    <div
      ref={formContainerRef}
      id={targetId}
      style={{
        minHeight: "200px",
        width: "100%",
        position: "relative"
      }}
    />
  );
};
