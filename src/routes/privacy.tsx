import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { LegalPage } from '../components/LegalPage'
import { H2, H3, P, UL, LI, A, Ph, Disclaimer, Updated } from '../components/legal-ui'

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
      <Disclaimer>
        {L(
          'Vorlage – keine Rechtsberatung. Sie beschreibt die tatsächlich auf dieser Website eingesetzten Dienste, muss aber vor dem Launch rechtlich geprüft und mit den echten Unternehmens-/Vertragsdaten ([markiert]) vervollständigt werden. Insbesondere die Einbindung des Live-Chats und der Standortermittlung kann eine Einwilligung erfordern.',
          'Template — not legal advice. It describes the services actually used on this website, but must be reviewed by a lawyer and completed with your real company/contract data ([highlighted]) before launch. In particular, the live chat and location lookup may require consent.',
        )}
      </Disclaimer>

      <H2>{L('1. Verantwortlicher', '1. Controller')}</H2>
      <P>
        {L(
          'Verantwortlicher im Sinne der DSGVO ist:',
          'The controller within the meaning of the GDPR is:',
        )}
      </P>
      <P>
        <Ph>{L('Firmenname / Inhaber', 'Company / owner')}</Ph>
        <br />
        {SITE.street}, {SITE.postalCode} {SITE.city}, {L('Deutschland', 'Germany')}
        <br />
        {L('E-Mail', 'Email')}: <A href={`mailto:${SITE.email}`}>{SITE.email}</A>
        {' · '}
        {L('Telefon', 'Phone')}: <A href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</A>
      </P>
      <P>
        {L(
          'Einen Datenschutzbeauftragten haben wir nicht bestellt, da hierzu keine gesetzliche Pflicht besteht.',
          'We have not appointed a data protection officer, as there is no legal obligation to do so.',
        )}
      </P>

      <H2>{L('2. Ihre Rechte', '2. Your rights')}</H2>
      <P>{L('Sie haben jederzeit das Recht auf:', 'You have the right at any time to:')}</P>
      <UL>
        <LI>{L('Auskunft (Art. 15 DSGVO)', 'Access (Art. 15 GDPR)')}</LI>
        <LI>{L('Berichtigung (Art. 16 DSGVO)', 'Rectification (Art. 16 GDPR)')}</LI>
        <LI>{L('Löschung (Art. 17 DSGVO)', 'Erasure (Art. 17 GDPR)')}</LI>
        <LI>{L('Einschränkung der Verarbeitung (Art. 18 DSGVO)', 'Restriction of processing (Art. 18 GDPR)')}</LI>
        <LI>{L('Datenübertragbarkeit (Art. 20 DSGVO)', 'Data portability (Art. 20 GDPR)')}</LI>
        <LI>{L('Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)', 'Objection to processing (Art. 21 GDPR)')}</LI>
        <LI>{L('Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)', 'Withdrawal of consent with effect for the future (Art. 7 (3) GDPR)')}</LI>
      </UL>
      <P>
        {L(
          'Zudem können Sie sich bei einer Aufsichtsbehörde beschweren. Für uns zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit, ',
          'You also have the right to lodge a complaint with a supervisory authority. The authority responsible for us is the Berlin Commissioner for Data Protection and Freedom of Information, ',
        )}
        <A href="https://www.datenschutz-berlin.de/">www.datenschutz-berlin.de</A>.
      </P>

      <H2>{L('3. Hosting (Cloudflare)', '3. Hosting (Cloudflare)')}</H2>
      <P>
        {L(
          'Diese Website wird bei Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA) gehostet und über deren weltweites Content-Delivery-Netzwerk ausgeliefert. Beim Aufruf der Website werden technisch notwendige Daten (u. a. IP-Adresse, Datum/Uhrzeit, aufgerufene URL, übertragene Datenmenge, Referrer, Browser-/Geräteangaben) verarbeitet, um die Seite sicher und zuverlässig bereitzustellen und Angriffe abzuwehren.',
          'This website is hosted by Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA) and delivered via its global content delivery network. When you access the site, technically necessary data (incl. IP address, date/time, requested URL, amount of data transferred, referrer, browser/device information) is processed in order to deliver the site securely and reliably and to defend against attacks.',
        )}
      </P>
      <P>
        {L(
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren, effizienten Betrieb). Mit Cloudflare besteht ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Datenschutzhinweise: ',
          'The legal basis is Art. 6 (1) (f) GDPR (legitimate interest in secure, efficient operation). A data processing agreement (Art. 28 GDPR) is in place with Cloudflare. Privacy notice: ',
        )}
        <A href="https://www.cloudflare.com/privacypolicy/">cloudflare.com/privacypolicy</A>.
      </P>

      <H2>{L('4. Cookies und lokaler Speicher', '4. Cookies and local storage')}</H2>
      <P>
        {L(
          'Für den Grundbetrieb der Website setzen wir keine Tracking-Cookies ein. Im lokalen Speicher (localStorage) Ihres Browsers speichern wir nur:',
          'For the basic operation of the website we do not use tracking cookies. We only store the following in your browser’s local storage:',
        )}
      </P>
      <UL>
        <LI>
          {L(
            'einen Hinweis, dass Sie den Cookie-/Analyse-Hinweis bestätigt haben (Schlüssel „inkyhaus-cookie-ack“),',
            'a flag that you acknowledged the cookie/analytics notice (key “inkyhaus-cookie-ack”),',
          )}
        </LI>
        <LI>
          {L(
            'einen Zähler abgesendeter Anfragen pro E-Mail-Adresse zum Schutz vor Spam/Mehrfachversand.',
            'a counter of submitted enquiries per email address to protect against spam/duplicate submissions.',
          )}
        </LI>
      </UL>
      <P>
        {L(
          'Diese Daten verbleiben auf Ihrem Gerät und werden nicht an uns übertragen. Drittanbieterdienste (Live-Chat, siehe Ziff. 7) können eigene Cookies/Speichereinträge setzen.',
          'This data stays on your device and is not transmitted to us. Third-party services (live chat, see section 7) may set their own cookies/storage entries.',
        )}
      </P>

      <H2>{L('5. Reichweitenmessung (Cloudflare Web Analytics)', '5. Analytics (Cloudflare Web Analytics)')}</H2>
      <P>
        {L(
          'Wir nutzen Cloudflare Web Analytics zur datenschutzfreundlichen Reichweitenmessung. Der Dienst arbeitet cookielos, erstellt keine geräteübergreifenden Profile und verwendet keine persistenten Kennungen. Erfasst werden aggregierte Nutzungsdaten (z. B. Seitenaufrufe, Referrer, ungefähre Herkunft). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der statistischen Auswertung).',
          'We use Cloudflare Web Analytics for privacy-friendly audience measurement. The service is cookieless, does not create cross-device profiles and uses no persistent identifiers. Aggregated usage data (e.g. page views, referrer, approximate origin) is collected. The legal basis is Art. 6 (1) (f) GDPR (legitimate interest in statistical analysis).',
        )}
      </P>

      <H2>{L('6. Kontaktaufnahme und Anfrageformular', '6. Contact and enquiry form')}</H2>
      <P>
        {L(
          'Wenn Sie unser Anfrageformular nutzen, verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, optional Telefonnummer, Produkt/Anlass, Menge, Wunschtermin, Nachricht) sowie technische Begleitdaten (aufgerufene Seite, Browser-Kennung/User-Agent und ein aus Ihrer IP-Adresse abgeleiteter, grober Standort – siehe Ziff. 8) zur Bearbeitung Ihrer Anfrage und Erstellung eines Angebots.',
          'When you use our enquiry form, we process the data you provide (name, email address, optionally phone number, product/occasion, quantity, preferred date, message) as well as technical accompanying data (the page you came from, browser identifier/user agent and a coarse location derived from your IP address – see section 8) in order to handle your enquiry and prepare a quote.',
        )}
      </P>
      <P>
        {L(
          'Die Formularübermittlung wird über Google Apps Script verarbeitet; Anbieter ist Google Ireland Ltd. (Gordon House, Barrow Street, Dublin 4, Irland) bzw. Google LLC (USA). Die Anfragen erreichen uns anschließend per E-Mail an ',
          'Form submissions are processed via Google Apps Script; the provider is Google Ireland Ltd. (Gordon House, Barrow Street, Dublin 4, Ireland) or Google LLC (USA). Enquiries then reach us by email at ',
        )}
        {SITE.email} {L('und', 'and')} {SITE.emailAlt}.
      </P>
      <P>
        {L(
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (Interesse an effizienter Kommunikation). Alternativ können Sie uns per E-Mail, Telefon oder WhatsApp erreichen; dabei verarbeiten wir die jeweils übermittelten Daten zur Bearbeitung Ihres Anliegens.',
          'The legal basis is Art. 6 (1) (b) GDPR (pre-contractual measures) or Art. 6 (1) (f) GDPR (interest in efficient communication). Alternatively you may reach us by email, phone or WhatsApp; we then process the data you transmit in order to handle your request.',
        )}
      </P>
      <P>
        {L('WhatsApp wird von der Meta Platforms Ireland Ltd. betrieben; bei Kontakt über WhatsApp gelten zusätzlich deren Datenschutzbestimmungen: ', 'WhatsApp is operated by Meta Platforms Ireland Ltd.; when you contact us via WhatsApp, their privacy terms additionally apply: ')}
        <A href="https://www.whatsapp.com/legal/privacy-policy">whatsapp.com/legal/privacy-policy</A>.
      </P>

      <H2>{L('7. Live-Chat (tawk.to)', '7. Live chat (tawk.to)')}</H2>
      <P>
        {L(
          'Wir setzen den Live-Chat-Dienst tawk.to der tawk.to inc. (187 East Warm Springs Rd, SB298, Las Vegas, NV 89119, USA) ein. Beim Laden des Chat-Widgets können Daten wie IP-Adresse, Geräte-/Browserinformationen, besuchte Seiten und Ihre Chatnachrichten an tawk.to übertragen und dort gespeichert werden; tawk.to kann eigene Cookies/Speichereinträge setzen.',
          'We use the live chat service tawk.to provided by tawk.to inc. (187 East Warm Springs Rd, SB298, Las Vegas, NV 89119, USA). When the chat widget loads, data such as your IP address, device/browser information, pages visited and your chat messages may be transmitted to and stored by tawk.to; tawk.to may set its own cookies/storage entries.',
        )}
      </P>
      <P>
        {L(
          'Zweck ist die unmittelbare Kommunikation mit Interessenten und Kunden. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG) bzw. unser berechtigtes Interesse an effizientem Kundensupport (Art. 6 Abs. 1 lit. f DSGVO). ',
          'The purpose is direct communication with prospective and existing customers. The legal basis is your consent (Art. 6 (1) (a) GDPR, § 25 (1) TTDSG) or our legitimate interest in efficient customer support (Art. 6 (1) (f) GDPR). ',
        )}
        <Ph>{L('Falls eine Einwilligung erforderlich ist, ein Consent-Banner für den Chat ergänzen.', 'If consent is required, add a consent banner gating the chat.')}</Ph>{' '}
        {L('Datenschutzhinweise: ', 'Privacy notice: ')}
        <A href="https://www.tawk.to/privacy-policy/">tawk.to/privacy-policy</A>.
      </P>

      <H2>{L('8. Standortermittlung über die IP-Adresse', '8. Location lookup via IP address')}</H2>
      <P>
        {L(
          'Zur sinnvollen Bearbeitung von Anfragen und zur Spam-Vermeidung ermitteln wir bei Nutzung des Formulars einen groben Standort (z. B. Stadt/Land). Hierzu wird Ihre IP-Adresse an einen der folgenden Dienste übermittelt: ipapi.co (Kloud51, Inc., USA), ipwho.is bzw. api.country.is. Es werden keine genauen Standortdaten (GPS) verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
          'To meaningfully process enquiries and to prevent spam, we determine a coarse location (e.g. city/country) when you use the form. For this, your IP address is transmitted to one of the following services: ipapi.co (Kloud51, Inc., USA), ipwho.is or api.country.is. No precise (GPS) location data is processed. The legal basis is Art. 6 (1) (f) GDPR (legitimate interest).',
        )}
      </P>

      <H2>{L('9. E-Mail-Kommunikation', '9. Email communication')}</H2>
      <P>
        {L(
          'Unsere geschäftliche E-Mail wird über den Anbieter Titan bereitgestellt; ergänzend nutzen wir ein Google-Mail-Postfach (Google Ireland Ltd./Google LLC). E-Mails, die Sie an uns senden, werden bei den jeweiligen Anbietern verarbeitet und gespeichert.',
          'Our business email is provided by Titan; we additionally use a Google mail inbox (Google Ireland Ltd./Google LLC). Emails you send us are processed and stored at the respective providers.',
        )}
      </P>

      <H2>{L('10. Empfänger und Drittlandübermittlung', '10. Recipients and international transfers')}</H2>
      <P>
        {L(
          'Eine Übermittlung an Dritte erfolgt nur an die oben genannten Auftragsverarbeiter/Dienste. Einige davon (Cloudflare, Google, tawk.to) haben Sitz bzw. Serverstandorte in den USA. Die Übermittlung erfolgt auf Basis des EU-US Data Privacy Framework und/oder der EU-Standardvertragsklauseln (Art. 46 DSGVO) mit ergänzenden Garantien.',
          'Data is only transferred to the processors/services named above. Some of them (Cloudflare, Google, tawk.to) are based or have server locations in the USA. Transfers are based on the EU-US Data Privacy Framework and/or the EU Standard Contractual Clauses (Art. 46 GDPR) with supplementary safeguards.',
        )}
      </P>

      <H2>{L('11. Speicherdauer', '11. Retention period')}</H2>
      <P>
        {L(
          'Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist. Anfragedaten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Für geschäftliche Vorgänge gelten gesetzliche Aufbewahrungsfristen (z. B. 6 bzw. 10 Jahre nach § 257 HGB, § 147 AO).',
          'We store personal data only for as long as necessary for the stated purposes. Enquiry data is deleted once the enquiry has been fully handled and no statutory retention obligations apply. Statutory retention periods apply to business transactions (e.g. 6 or 10 years under § 257 HGB, § 147 AO).',
        )}
      </P>

      <H2>{L('12. Pflicht zur Bereitstellung; automatisierte Entscheidungen', '12. Obligation to provide data; automated decisions')}</H2>
      <P>
        {L(
          'Die Bereitstellung Ihrer Daten ist freiwillig; ohne die für eine Anfrage notwendigen Angaben können wir Ihr Anliegen jedoch ggf. nicht bearbeiten. Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 DSGVO findet nicht statt.',
          'Providing your data is voluntary; however, without the information necessary for an enquiry we may not be able to process your request. No automated decision-making, including profiling, within the meaning of Art. 22 GDPR takes place.',
        )}
      </P>

      <H2>{L('13. Änderungen', '13. Changes')}</H2>
      <P>
        {L(
          'Wir passen diese Datenschutzerklärung an, sobald sich die Datenverarbeitung oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.',
          'We will update this privacy policy whenever our data processing or the legal situation changes. The version published here applies in each case.',
        )}
      </P>

      <Updated>{L('Stand: Entwurf – bitte vor Veröffentlichung prüfen.', 'Status: draft — please review before publishing.')}</Updated>
    </LegalPage>
  )
}
