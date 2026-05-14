import "./globals.css";
import TopBar from "../components/topbar";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
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
      <body className={`${mono.className} bg-white text-black`}>
        <TopBar />
        <main className="pt-28 md:pt-16">{children}</main>
      </body>
    </html>
  );
}