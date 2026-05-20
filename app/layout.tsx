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
      <body className="bg-white text-black">
        <TopBar />
        <div className="pt-[104px] lg:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
