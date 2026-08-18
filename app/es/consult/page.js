import ConsultationClient from "../../consult/ConsultationClient";

export const metadata = {
  title: "Consulta capilar | Prohall Professional",
  description: "Recibe orientación capilar personalizada según tu textura, rutina, historial químico y objetivos.",
  alternates: {
    languages: {
      en: "/consult",
      es: "/es/consult"
    }
  }
};

export default function ConsultationPageEs() {
  return <ConsultationClient />;
}
