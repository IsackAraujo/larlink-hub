import type { NextConfig } from "next";

// Cache Components desligado: quase todas as telas dependem do usuário logado.
// Ver docs/decisoes/0003-renderizacao-dinamica.md
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
