import "./globals.css";
import StickyChat from "./components/StickyChat";

export const metadata = {
  title: "Prohall Professional — Brazilian Hair Science",
  description: "Professional hair treatments engineered in Brazil for smoother, stronger, visibly healthier hair."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <StickyChat />
      </body>
    </html>
  );
}
