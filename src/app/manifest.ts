import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Menú semanal",
    short_name: "Menú",
    description: "Planificación semanal de almuerzos y cenas",
    start_url: "/today",
    display: "standalone",
    background_color: "#f7f5ee",
    theme_color: "#f7f5ee",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
