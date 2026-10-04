import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackgroundArcs } from "./components/BackgroundArcs";
import { ScrollToTop } from "./components/ScrollToTop";
import { Banner } from "./components/Banner";
import { DevConsole, DEV_PREVIEW_KEY } from "./components/DevConsole";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { SectionIndexPage } from "./pages/SectionIndexPage";
import { SectionItemPage } from "./pages/SectionItemPage";
import { LibraryPage } from "./pages/LibraryPage";
import { LibraryArticlePage } from "./pages/LibraryArticlePage";
import { AudioProvider } from "./contexts/AudioContext";
import { useTheme } from "./theme";
import { siteConfig } from "./config/site";
import { getSectionItems } from "./content/sections";
import { libraryAliases } from "./content/library";

export const App: React.FC = () => {
  useTheme();

  const [bannerVisible, setBannerVisible] = useState(false);
  const bannerStorageKey = siteConfig.banner?.storageKey || "banner-dismissed";

  useEffect(() => {
    if (siteConfig.banner?.enabled) {
      const dismissed = localStorage.getItem(bannerStorageKey);
      if (!dismissed) {
        setBannerVisible(true);
      }
    }
  }, [bannerStorageKey]);

  const handleBannerDismiss = () => {
    localStorage.setItem(bannerStorageKey, "true");
    setBannerVisible(false);
  };

  const handleBannerShow = () => {
    localStorage.removeItem(bannerStorageKey);
    setBannerVisible(true);
  };

  // Dev preview: every route except "/" redirects home until the flag is set
  // by typing `dev-preview` into the backtick console. Persists per browser.
  const [devPreview, setDevPreview] = useState(
    () => localStorage.getItem(DEV_PREVIEW_KEY) === "true"
  );
  const handleConsoleCommand = (cmd: string) => {
    if (cmd === DEV_PREVIEW_KEY) {
      localStorage.setItem(DEV_PREVIEW_KEY, "true");
      setDevPreview(true);
    } else if (cmd === "disable-preview") {
      localStorage.removeItem(DEV_PREVIEW_KEY);
      setDevPreview(false);
    }
  };
  const gate = (element: React.ReactElement) =>
    devPreview ? element : <Navigate to="/" replace />;

  return (
    <AudioProvider>
      <BrowserRouter>
      <ScrollToTop />
      <div
        className="slam-theme"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--gf-font-body)",
          background: "var(--gf-color-background)",
          color: "var(--gf-color-text)",
          position: "relative"
        }}
      >
        <BackgroundArcs />
        <DevConsole onCommand={handleConsoleCommand} />
        {siteConfig.banner?.enabled && (
          <Banner
            message={siteConfig.banner.message}
            isVisible={bannerVisible}
            onDismiss={handleBannerDismiss}
          />
        )}
        <Header
          showBannerButton={siteConfig.banner?.enabled && !bannerVisible}
          onShowBanner={handleBannerShow}
          navUnlocked={devPreview}
        />
        <main
          className="main-content"
          style={{ flex: 1 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            {siteConfig.contentSections.library?.enabled && (
              <>
                <Route path="/library" element={gate(<LibraryPage />)} />
                {libraryAliases.map(({ from, to }) => (
                  <Route
                    key={from}
                    path={`/library/${from}`}
                    element={<Navigate to={`/library/${to}`} replace />}
                  />
                ))}
                <Route path="/library/:slug" element={gate(<LibraryArticlePage />)} />
              </>
            )}
            {Object.entries(siteConfig.contentSections).map(
              ([section, config]) =>
                config.enabled &&
                section !== "library" && (
                  <React.Fragment key={section}>
                    <Route
                      path={`/${section}`}
                      element={gate(<SectionIndexPage section={section} />)}
                    />
                    {getSectionItems(section)
                      .filter((item) => item.path)
                      .map((item) => (
                        <Route
                          key={item.path}
                          path={item.path}
                          element={gate(
                            <SectionItemPage
                              section={section}
                              path={item.path}
                            />
                          )}
                        />
                      ))}
                    <Route
                      path={`/${section}/:slug`}
                      element={gate(<SectionItemPage section={section} />)}
                    />
                  </React.Fragment>
                )
            )}
            {siteConfig.contactPages.map((contact) => (
              <Route
                key={contact.path}
                path={contact.path}
                element={gate(<ContactPage />)}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </AudioProvider>
  );
};
