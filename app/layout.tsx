import "./globals.css";
import Player from "../components/player";
import Navbar from "../components/navbar";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={syne.className}>
        <Navbar />
        {children}
        <Player />
      </body>
    </html>
  );
}