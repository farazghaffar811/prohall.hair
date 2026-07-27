import "./globals.css";

export const metadata = {
  title: "Prohall Professional — Brazilian Hair Science",
  description: "Professional hair treatments engineered in Brazil for smoother, stronger, visibly healthier hair."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
