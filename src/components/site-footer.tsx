export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <img src="/logo/logo-color.png" alt="Security Slam" className="footer-logo" />
        <div className="footer-links">
          <a href="https://contribute.cncf.io/community/tags/security-and-compliance/" target="_blank" rel="noreferrer">CNCF TAG Security &amp; Compliance</a>
          <a href="https://openssf.org" target="_blank" rel="noreferrer">OpenSSF</a>
          <a href="https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/" target="_blank" rel="noreferrer">KubeCon North America</a>
        </div>
      </div>
    </footer>
  );
}