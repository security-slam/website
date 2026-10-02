import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackgroundArcs } from "./components/BackgroundArcs";
import { ScrollToTop } from "./components/ScrollToTop";
import { Banner } from "./components/Banner";
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
        />
        <main
          className="main-content"
          style={{ flex: 1 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            {siteConfig.contentSections.library?.enabled && (
              <>
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/library/:slug" element={<LibraryArticlePage />} />
              </>
            )}
            {Object.entries(siteConfig.contentSections).map(
              ([section, config]) =>
                config.enabled &&
                section !== "library" && (
                  <React.Fragment key={section}>
                    <Route
                      path={`/${section}`}
                      element={<SectionIndexPage section={section} />}
                    />
                    {getSectionItems(section)
                      .filter((item) => item.path)
                      .map((item) => (
                        <Route
                          key={item.path}
                          path={item.path}
                          element={
                            <SectionItemPage
                              section={section}
                              path={item.path}
                            />
                          }
                        />
                      ))}
                    <Route
                      path={`/${section}/:slug`}
                      element={<SectionItemPage section={section} />}
                    />
                  </React.Fragment>
                )
            )}
            {siteConfig.contactPages.map((contact) => (
              <Route
                key={contact.path}
                path={contact.path}
                element={<ContactPage />}
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
