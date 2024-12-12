import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Some Company",
  description: "Some Company by matveyGlush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
