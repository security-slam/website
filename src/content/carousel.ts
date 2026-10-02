// Public assets are served at root; use /slam-photos/ paths (see vite publicDir)
const carouselImageNames = [
  "argoproj-maintainers.avif",
  "artifact-hub-maintainers.avif",
  "flux-maintainers.avif",
  "meshery-maintainers.avif",
  "openfga-maintainers.avif",
  "oscal-compass-maintainers.avif"
];

export const carouselImages: string[] = carouselImageNames.map(
  (name) => `/slam-photos/${name}`
);