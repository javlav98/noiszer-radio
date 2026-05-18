import "./globals.css";
import Footer from "../components/footer";
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
      <body className="bg-[#f7f7f4] text-[#050505]">
        <TopBar />
        <div className="pt-[104px] md:pt-20">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
