import type { Metadata, Viewport } from "next";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Larlink Hub", template: "%s · Larlink Hub" },
  description: "Plataforma interna de desempenho da Larlink",
  appleWebApp: { capable: true, title: "Larlink", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#1d2c42",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <AmbientBackground />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
