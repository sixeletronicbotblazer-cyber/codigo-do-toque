import type { Metadata } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/bodoni-moda/latin-600.css";
import "@fontsource/bodoni-moda/latin-400-italic.css";
import "./globals.css";
import "./theme-v3.css";

export const metadata: Metadata = {
  title: "Código do Toque | 23 movimentos para conduzir com mais presença",
  description:
    "Conheça o guia digital Código do Toque: 23 movimentos e três bônus para explorar presença, ritmo e comunicação na intimidade a dois.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
