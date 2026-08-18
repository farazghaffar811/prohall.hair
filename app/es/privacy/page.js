export const metadata = {
  title: "Privacidad de la consulta | Prohall Professional",
  description: "Cómo gestiona Prohall las cuentas de consulta, las transcripciones de chat y la información del perfil capilar.",
  alternates: {
    languages: {
      en: "/privacy",
      es: "/es/privacy"
    }
  }
};

export default function PrivacyPageEs() {
  return (
    <main className="privacy-page">
      <header className="manual-header">
        <a className="logo" href="/es" aria-label="Inicio de Prohall Professional">
          PROHALL <small>PROFESSIONAL</small>
        </a>
        <a className="manual-back" href="/es/consult">Volver a la consulta</a>
      </header>

      <article>
        <p className="overline">Privacidad de la consulta</p>
        <h1>Tu cuenta y tu<br /><em>consulta capilar.</em></h1>
        <p className="privacy-intro">Este aviso explica los datos que se utilizan cuando creas una cuenta de consulta o hablas con el consultor capilar de IA de Prohall.</p>

        <section>
          <h2>Qué se almacena</h2>
          <p>Prohall almacena tu dirección de correo normalizada, una contraseña cifrada de forma segura mediante Supabase Auth, las transcripciones de la consulta, un perfil capilar creado a partir de tus respuestas y la atribución del sitio Prohall que utilizaste.</p>
        </section>

        <section>
          <h2>Cómo se usa tu cuenta</h2>
          <p>Tu cuenta de consulta se usa únicamente para acceder a la consulta, guardar el historial de chat y tu perfil capilar. Las cuentas se comparten con prohall.ai para que el mismo historial de consulta te acompañe en ambas experiencias Prohall.</p>
        </section>

        <section>
          <h2>Fotos</h2>
          <p>La herramienta de foto actual crea una vista previa solo en tu navegador. La API de consulta acepta texto y la foto seleccionada no se sube.</p>
        </section>

        <section>
          <h2>Conservación y eliminación</h2>
          <p>Prohall conserva los datos de la consulta durante la vida de la cuenta. Puedes solicitar la eliminación de la cuenta contactando con el soporte de Prohall.</p>
        </section>

        <section>
          <h2>Límites importantes</h2>
          <p>El consultor ofrece orientación cosmética para el cuidado del cabello. No diagnostica ni trata afecciones médicas o del cuero cabelludo y no proporciona recomendaciones de productos.</p>
        </section>
      </article>
    </main>
  );
}
