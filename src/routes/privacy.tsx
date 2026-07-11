import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { LegalPage } from '../components/LegalPage'
import { H2, P, A } from '../components/legal-ui'

export const Route = createFileRoute('/privacy')({
  head: () =>
    pageHead({
      title: 'Datenschutz · Inkyhaus',
      description: 'Datenschutzerklärung von Inkyhaus.',
      path: '/privacy',
      locale: DEFAULT_LOCALE,
      noindex: true,
    }),
  component: Privacy,
})

function Privacy() {
  const { locale } = useI18n()
  const L = (de: string, en: string) => (locale === 'en' ? en : de)

  return (
    <LegalPage titleKeyDe="Datenschutzerklärung" titleEn="Privacy Policy">
      <H2>{L('1. Verantwortlicher', '1. Controller')}</H2>
      <P>
        {SITE.name}
        <br />
        {SITE.street}, {SITE.postalCode} {SITE.city}, {L('Deutschland', 'Germany')}
        <br />
        {L('E-Mail', 'Email')}: <A href={`mailto:${SITE.email}`}>{SITE.email}</A>
        {' · '}
        <A href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</A>
        {' · '}
        {L('Telefon', 'Phone')}: <A href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</A>
        {' · '}
        <A href={`tel:${SITE.phone2.replace(/\s/g, '')}`}>{SITE.phone2}</A>
      </P>

      <H2>{L('2. Ihre Rechte', '2. Your rights')}</H2>
      <P>
        {L(
          'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, erteilte Einwilligungen zu widerrufen. Zudem können Sie sich bei einer Aufsichtsbehörde beschweren – für uns zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit (',
          'You have the right to access, rectification, erasure, restriction of processing, data portability and objection, as well as the right to withdraw consent. You may also lodge a complaint with a supervisory authority — the one responsible for us is the Berlin Commissioner for Data Protection and Freedom of Information (',
        )}
        <A href="https://www.datenschutz-berlin.de/">datenschutz-berlin.de</A>).
      </P>

      <H2>{L('3. Hosting und Zugriffsdaten', '3. Hosting and access data')}</H2>
      <P>
        {L(
          'Diese Website wird bei Cloudflare, Inc. (USA) gehostet und über deren Content-Delivery-Netzwerk ausgeliefert. Beim Aufruf werden technisch notwendige Zugriffsdaten (u. a. IP-Adresse, Datum/Uhrzeit, aufgerufene URL, Referrer, Browser-/Geräteangaben) verarbeitet, um die Website sicher bereitzustellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Datenschutzhinweise: ',
          'This website is hosted by Cloudflare, Inc. (USA) and delivered via its content delivery network. When you access the site, technically necessary access data (incl. IP address, date/time, requested URL, referrer, browser/device details) is processed to deliver the site securely. The legal basis is Art. 6 (1) (f) GDPR. Privacy notice: ',
        )}
        <A href="https://www.cloudflare.com/privacypolicy/">cloudflare.com/privacypolicy</A>.
      </P>

      <H2>{L('4. Cookies und lokaler Speicher', '4. Cookies and local storage')}</H2>
      <P>
        {L(
          'Für den Grundbetrieb setzen wir keine Tracking-Cookies. Im lokalen Speicher Ihres Browsers merken wir uns nur, dass Sie den Cookie-Hinweis bestätigt haben, sowie einen Zähler abgesendeter Anfragen zum Spam-Schutz. Diese Daten verbleiben auf Ihrem Gerät. Der Live-Chat (Ziff. 7) kann eigene Cookies/Speichereinträge setzen.',
          'We do not use tracking cookies for basic operation. In your browser’s local storage we only remember that you acknowledged the cookie notice, plus a counter of submitted enquiries for spam protection. This data stays on your device. The live chat (section 7) may set its own cookies/storage entries.',
        )}
      </P>

      <H2>{L('5. Reichweitenmessung (Cloudflare Web Analytics)', '5. Analytics (Cloudflare Web Analytics)')}</H2>
      <P>
        {L(
          'Wir nutzen Cloudflare Web Analytics zur datenschutzfreundlichen, cookielosen Reichweitenmessung ohne geräteübergreifende Profile. Erfasst werden aggregierte Nutzungsdaten (z. B. Seitenaufrufe, Referrer). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',
          'We use Cloudflare Web Analytics for privacy-friendly, cookieless audience measurement without cross-device profiles. Aggregated usage data (e.g. page views, referrer) is collected. The legal basis is Art. 6 (1) (f) GDPR.',
        )}
      </P>

      <H2>{L('6. Kontaktaufnahme und Anfrageformular', '6. Contact and enquiry form')}</H2>
      <P>
        {L(
          'Nutzen Sie unser Anfrageformular, verarbeiten wir Ihre Angaben (Name, E-Mail, optional Telefon, Produkt/Anlass, Menge, Wunschtermin, Nachricht) sowie technische Begleitdaten (aufgerufene Seite, User-Agent und einen aus der IP abgeleiteten groben Standort – siehe Ziff. 8) zur Bearbeitung Ihrer Anfrage. Die Übermittlung erfolgt über Google Apps Script (Google Ireland Ltd. / Google LLC); die Anfragen erreichen uns per E-Mail an ',
          'When you use our enquiry form, we process your details (name, email, optionally phone, product/occasion, quantity, preferred date, message) and technical accompanying data (the page you came from, user agent and a coarse location derived from your IP – see section 8) to handle your enquiry. Submission is handled via Google Apps Script (Google Ireland Ltd. / Google LLC); enquiries reach us by email at ',
        )}
        {SITE.email} {L('und', 'and')} {SITE.emailAlt}. {L('Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO.', 'The legal basis is Art. 6 (1) (b) and (f) GDPR.')}
      </P>
      <P>
        {L(
          'Alternativ erreichen Sie uns per E-Mail, Telefon oder WhatsApp (Meta Platforms Ireland Ltd., ',
          'Alternatively you can reach us by email, phone or WhatsApp (Meta Platforms Ireland Ltd., ',
        )}
        <A href="https://www.whatsapp.com/legal/privacy-policy">whatsapp.com/legal/privacy-policy</A>
        {L('); dabei verarbeiten wir die jeweils übermittelten Daten zur Bearbeitung Ihres Anliegens.', '); we then process the data you transmit to handle your request.')}
      </P>

      <H2>{L('7. Live-Chat (tawk.to)', '7. Live chat (tawk.to)')}</H2>
      <P>
        {L(
          'Wir setzen den Live-Chat tawk.to (tawk.to inc., USA) ein. Beim Laden des Widgets können IP-Adresse, Geräte-/Browserdaten, besuchte Seiten und Ihre Nachrichten an tawk.to übermittelt und dort gespeichert werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a bzw. f DSGVO. Datenschutzhinweise: ',
          'We use the live chat tawk.to (tawk.to inc., USA). When the widget loads, your IP address, device/browser data, pages visited and your messages may be transmitted to and stored by tawk.to. The legal basis is Art. 6 (1) (a) or (f) GDPR. Privacy notice: ',
        )}
        <A href="https://www.tawk.to/privacy-policy/">tawk.to/privacy-policy</A>.
      </P>

      <H2>{L('8. Standortermittlung über die IP-Adresse', '8. Location lookup via IP address')}</H2>
      <P>
        {L(
          'Bei Nutzung des Formulars ermitteln wir zur sinnvollen Bearbeitung und Spam-Vermeidung einen groben Standort (z. B. Stadt/Land). Dazu wird Ihre IP-Adresse an einen der Dienste ipapi.co, ipwho.is oder api.country.is übermittelt. Genaue Standortdaten (GPS) verarbeiten wir nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',
          'When you use the form, we determine a coarse location (e.g. city/country) for meaningful processing and spam prevention. For this, your IP address is transmitted to one of the services ipapi.co, ipwho.is or api.country.is. We do not process precise (GPS) location data. The legal basis is Art. 6 (1) (f) GDPR.',
        )}
      </P>

      <H2>{L('9. Empfänger und Drittlandübermittlung', '9. Recipients and international transfers')}</H2>
      <P>
        {L(
          'Personenbezogene Daten geben wir nur an die genannten Dienste weiter. Einige davon (Cloudflare, Google, tawk.to) verarbeiten Daten in den USA; die Übermittlung stützt sich auf das EU-US Data Privacy Framework und/oder EU-Standardvertragsklauseln (Art. 46 DSGVO).',
          'We only share personal data with the services named above. Some of them (Cloudflare, Google, tawk.to) process data in the USA; transfers are based on the EU-US Data Privacy Framework and/or EU Standard Contractual Clauses (Art. 46 GDPR).',
        )}
      </P>

      <H2>{L('10. Speicherdauer', '10. Retention period')}</H2>
      <P>
        {L(
          'Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist bzw. gesetzliche Aufbewahrungsfristen (z. B. § 257 HGB, § 147 AO) es verlangen.',
          'We store personal data only for as long as necessary for the stated purposes or as required by statutory retention periods (e.g. § 257 HGB, § 147 AO).',
        )}
      </P>
    </LegalPage>
  )
}
