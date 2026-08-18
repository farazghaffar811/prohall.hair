import SetSpanishLang from "./SetSpanishLang";

export const metadata = {
  title: "Prohall Professional — Ciencia capilar brasileña",
  description: "Tratamientos capilares profesionales creados en Brasil para un cabello más liso, fuerte y visiblemente sano.",
  alternates: {
    languages: {
      en: "/",
      es: "/es"
    }
  }
};

export default function SpanishLayout({ children }) {
  return (
    <>
      <SetSpanishLang />
      {children}
    </>
  );
}
