// Public assets are served at root; use /logo/sponsor-logos/ paths (see vite publicDir)
const sponsorLogoNames = [
  "cncf-white.svg",
  "openssf-white.svg"
];

export const sponsorLogos: string[] = sponsorLogoNames.map(
  (name) => `/logo/sponsor-logos/${name}`
);
