import "./globals.css";
import Player from "../components/Player";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}
        <Player />
      </body>
    </html>
  )
}   

