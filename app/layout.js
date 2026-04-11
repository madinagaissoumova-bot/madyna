import "./globals.css";
import SiteFooter from "../components/SiteFooter";
import { StoreProvider } from "../components/StoreProvider";

export const metadata = {
  title: "Mady Mode | Elegance Modeste",
  description:
    "Mady Mode, boutique de vetements modestes au style premium, feminin et contemporain."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700&family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          {children}
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
