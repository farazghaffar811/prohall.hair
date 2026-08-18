import "./globals.css";
import StickyChat from "./components/StickyChat";
import ConsultTokenCapture from "./components/ConsultTokenCapture";

export const metadata = {
  title: "Prohall Professional — Brazilian Hair Science",
  description: "Professional hair treatments engineered in Brazil for smoother, stronger, visibly healthier hair.",
  alternates: {
    languages: {
      en: "/",
      es: "/es"
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConsultTokenCapture />
        {children}
        <StickyChat />
      </body>
    </html>
  );
}
