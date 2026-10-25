import React, { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-Spam Trap
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Optional: In .env via VITE_CONTACT_ENDPOINT konfigurierbar (z. B. Formspree oder Web3Forms)
  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Spam-Schutz: Wenn Bot das versteckte Honeypot-Feld befüllt, stumm abbrechen
    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    // Client-seitige Validierung
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Bitte fülle alle Pflichtfelder (*) vollständig aus.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (contactEndpoint) {
        // Echte HTTP-Submission bei konfiguriertem Service
        const response = await fetch(contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: formData.subject.trim() || 'Kontaktanfrage via Portfolio',
            message: trimmedMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('Server hat die Nachricht abgelehnt.');
        }
      } else {
        // Lokale Simulation mit realistischer Latenz
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Fehler beim Nachrichtenversand:', err);
      setErrorMessage(
        'Beim Versenden ist ein Fehler aufgetreten. Bitte versuche es erneut oder nutze den direkten E-Mail-Link.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    });
    setErrorMessage(null);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 bg-[var(--surface-color)] border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-4xl px-6">
        {/* Kopfbereich */}
        <p
          className="text-sm font-semibold tracking-widest uppercase text-[var(--primary-color)] mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Kontakt
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4 text-glow"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Lass uns ins Gespräch kommen.
        </h2>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl">
          Fragen zu meinen Projekten oder Interesse an einer Zusammenarbeit? Ich freue mich auf deine Nachricht.
        </p>

        <hr className="my-10 border-[var(--border-color)]" />

        {/* Erfolgsanzeige */}
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center text-center py-6 min-h-[40vh]">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-color)] flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(0,229,192,0.4)]">
              <i className="fa-solid fa-check text-xl text-[#0B0F14]" />
            </div>
            <h3
              className="text-xl md:text-2xl font-bold text-[var(--text-color)] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Nachricht erfolgreich gesendet!
            </h3>
            <p className="text-[var(--text-muted)] text-base max-w-md mx-auto mb-6">
              Vielen Dank für deine Nachricht. Ich habe deine Anfrage erhalten und werde mich so bald wie möglich bei dir melden.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn border border-[var(--primary-color)]! bg-transparent! text-[var(--primary-color)]! hover:bg-[var(--primary-color)]! hover:text-[#0B0F14]! px-6 py-2.5 h-auto font-semibold rounded-full inline-flex items-center gap-2 cursor-pointer transition-all glow-border"
            >
              <i className="fa-solid fa-arrow-left" />
              <span>Zurück zur Startseite</span>
            </button>
          </div>
        ) : (
          /* Formularansicht */
          <div>
            {errorMessage && (
              <div
                role="alert"
                className="alert alert-error mb-6 rounded-lg bg-[var(--background-color)] text-red-400 border border-red-500/50 p-4 flex items-center gap-3"
              >
                <i className="fa-solid fa-triangle-exclamation" />
                <span style={{ fontFamily: 'var(--font-mono)' }}>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10" noValidate>
              {/* Honeypot Feld: Für Menschen unsichtbar, fängt Bots ab */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <fieldset className="w-full">
                  <label
                    htmlFor="contact-name"
                    className="block text-base font-bold text-[var(--text-color)] mb-3"
                  >
                    Name <span className="text-[var(--primary-color)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Max Mustermann"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-shadow"
                  />
                </fieldset>

                <fieldset className="w-full">
                  <label
                    htmlFor="contact-email"
                    className="block text-base font-bold text-[var(--text-color)] mb-3"
                  >
                    E-Mail-Adresse <span className="text-[var(--primary-color)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="max@beispiel.de"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-shadow"
                  />
                </fieldset>
              </div>

              <fieldset className="w-full mt-6">
                <label
                  htmlFor="contact-subject"
                  className="block text-base font-bold text-[var(--text-color)] mb-3"
                >
                  Betreff
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Worum geht es?"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-shadow"
                />
              </fieldset>

              <fieldset className="w-full mt-6">
                <label
                  htmlFor="contact-message"
                  className="block text-base font-bold text-[var(--text-color)] mb-3"
                >
                  Nachricht <span className="text-[var(--primary-color)]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Schreibe mir deine Nachricht ..."
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-shadow resize-y"
                />
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full mt-8 border border-[var(--primary-color)]! bg-[var(--primary-color)]/10! text-[var(--primary-color)]! hover:bg-[var(--primary-color)]! hover:text-[#0B0F14]! px-8 py-3 h-auto font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all glow-border disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin" />
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    <span>Nachricht senden</span>
                  </>
                )}
              </button>

              <p
                className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] text-center"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <i className="fa-solid fa-shield-halved" />
                <span>Deine Angaben werden ausschließlich zur Bearbeitung deiner Anfrage verwendet.</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
