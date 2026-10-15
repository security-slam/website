import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { badges, navItems } from "@/lib/security-slam-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell site-header-row">
        <Link to="/" className="brand-lockup" aria-label="Security Slam home">
          <img src="/logo/tag-sc-logo-color.png" alt="CNCF TAG Security & Compliance" className="tag-logo" />
          <span className="brand-divider" aria-hidden="true" />
          <img src="/logo/logo-color.png" alt="Security Slam" className="slam-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/" className="nav-link nav-home" activeOptions={{ exact: true }}>Home</Link>
          <div className="nav-dropdown" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <Button type="button" variant="ghost" className="nav-link nav-dropdown-trigger" aria-haspopup="true" aria-expanded={dd} onClick={() => setDd((v) => !v)}>
              Objectives <ChevronDown size={14} />
            </Button>
            {dd ? (
              <div className="nav-dropdown-panel">
                <span className="dropdown-label">Badges</span>
                {badges.map((b) => (
                  <Link key={b.slug} to="/library/$slug" params={{ slug: b.slug }} className="dropdown-item" onClick={() => setDd(false)}>
                    <img src={`/badge-icons/${b.slug}.png`} alt="" />
                    {b.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {navItems.map((item) =>
            item.label === "Register" ? (
              <Button key={item.href} asChild variant="campaign" size="campaignSm" className="nav-register">
                <Link to={item.href}>{item.label}</Link>
              </Button>
            ) : (
              <Link key={item.href} to={item.href} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Button
          type="button"
          variant="iconGhost"
          size="icon"
          className="mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <nav className="mobile-nav site-shell" aria-label="Mobile navigation">
          <Link to="/" className="mobile-nav-link" onClick={() => setOpen(false)}>Home</Link>
          <span className="mobile-nav-link">Objectives</span>
          <div className="mobile-badges">
            {badges.map((b) => (
              <Link key={b.slug} to="/library/$slug" params={{ slug: b.slug }} className="dropdown-item" onClick={() => setOpen(false)}>
                <img src={`/badge-icons/${b.slug}.png`} alt="" />
                {b.name}
              </Link>
            ))}
          </div>
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
