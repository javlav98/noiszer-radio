import "./globals.css";
import TopBar from "../components/topbar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <TopBar />
        <main className="pt-28 md:pt-16">{children}</main>
      </body>
    </html>
  );
}