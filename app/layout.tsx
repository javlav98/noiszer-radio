import "./globals.css";
import TopBar from "../components/topbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noiszer Radio",
  description:
    "Independent web radio for underground shows, visual experiments, and leftfield sound.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--paper)] text-[var(--ink)]">
        <TopBar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
