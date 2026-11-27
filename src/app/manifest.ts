import type { MetadataRoute } from "next";

/** Torna o Hub instalável: no iPhone, Safari › Compartilhar › Adicionar à Tela de Início. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Larlink Hub",
    short_name: "Larlink",
    description: "Vendas, clientes e números da Larlink num lugar só.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F8FA",
    theme_color: "#1D2C42",
    lang: "pt-BR",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
