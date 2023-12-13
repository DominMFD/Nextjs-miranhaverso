import type { Metadata } from "next";
import Image from "next/image";
import "./globals.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Miranhaverse",
  description: "Informações sobre os mirnhas de vários universos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Link href={"/"}>
            <Image
              src="/spider-logo.svg"
              alt="Logo do Spiderman"
              width={260}
              height={70}
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
