export const metadata = {
  title: "Consultation Privacy | Prohall Professional",
  description: "How Prohall handles consultation accounts, chat transcripts and hair-profile information."
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="manual-header">
        <a className="logo" href="/" aria-label="Prohall Professional home">
          PROHALL <small>PROFESSIONAL</small>
        </a>
        <a className="manual-back" href="/consult">Back to consultation</a>
      </header>

      <article>
        <p className="overline">Consultation privacy</p>
        <h1>Your account and<br /><em>hair consultation.</em></h1>
        <p className="privacy-intro">This notice explains the data used when you create a consultation account or speak with the Prohall AI hair consultant.</p>

        <section>
          <h2>What is stored</h2>
          <p>Prohall stores your normalized email address, a securely hashed password through Supabase Auth, consultation transcripts, a hair profile built from your answers, and attribution showing which Prohall site you used.</p>
        </section>

        <section>
          <h2>How your account is used</h2>
          <p>Your consultation account is used only for consultation access, saved chat history and your hair profile. Accounts are shared with prohall.ai so the same consultation history can follow you across both Prohall experiences.</p>
        </section>

        <section>
          <h2>Photos</h2>
          <p>The current photo tool creates a preview only in your browser. The consultation API accepts text and the selected photo is not uploaded.</p>
        </section>

        <section>
          <h2>Retention and deletion</h2>
          <p>Prohall retains consultation data for the life of the account. You may request account deletion by contacting Prohall support.</p>
        </section>

        <section>
          <h2>Important limits</h2>
          <p>The consultant provides cosmetic hair-care guidance. It does not diagnose or treat medical or scalp conditions and does not provide product recommendations.</p>
        </section>
      </article>
    </main>
  );
}
