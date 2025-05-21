import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cabecalho from "@/components/cabecalho/cabecalho";
import { ItemCabecalho } from "@/interfaces/item-cabecalho";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const listaCabecalhos: ItemCabecalho[] = [
  { nome: "Início", rota: "/inicio" },
  { nome: "Extrato", rota: "/extrato" }
];

export const metadata: Metadata = {
  title: "Tech Challenge",
  description: "Aplicação de controle financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Cabecalho lista={ listaCabecalhos }></Cabecalho>
        <main className="p-(--gg)">
          {children}
        </main>
      </body>
    </html>
  );
}
