import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { LegalPage } from '../components/LegalPage'
import { H2, P, UL, LI, A, Ph, Disclaimer, Updated } from '../components/legal-ui'

export const Route = createFileRoute('/imprint')({
  head: () =>
    pageHead({
      title: 'Impressum · Inkyhaus',
      description: 'Impressum von Inkyhaus.',
      path: '/imprint',
      locale: DEFAULT_LOCALE,
      noindex: true,
    }),
  component: Imprint,
})

function Imprint() {
  const { locale } = useI18n()
  const L = (de: string, en: string) => (locale === 'en' ? en : de)

  return (
    <LegalPage titleKeyDe="Impressum" titleEn="Imprint">
      <Disclaimer>
        {L(
          'Vorlage – keine Rechtsberatung. Vor dem Launch von einer Rechtsanwältin/einem Rechtsanwalt prüfen lassen und alle [markierten] Angaben durch die echten Unternehmensdaten ersetzen.',
          'Template — not legal advice. Have it reviewed by a lawyer before launch and replace every [highlighted] placeholder with your real company data.',
        )}
      </Disclaimer>

      <H2>{L('Angaben gemäß § 5 DDG', 'Information pursuant to § 5 DDG (German Digital Services Act)')}</H2>
      <P>
        <Ph>{L('Vollständiger Firmenname / Inhaber', 'Full legal / trading name')}</Ph>
        <br />
        <Ph>{L('Rechtsform, z. B. Einzelunternehmen / GmbH', 'Legal form, e.g. sole proprietor / GmbH')}</Ph>
        <br />
        {SITE.street}
        <br />
        {SITE.postalCode} {SITE.city} ({SITE.district})
        <br />
        {L('Deutschland', 'Germany')}
      </P>

      <H2>{L('Vertreten durch', 'Represented by')}</H2>
      <P>
        <Ph>{L('Name der vertretungsberechtigten Person(en)', 'Name of authorised representative(s)')}</Ph>
      </P>

      <H2>{L('Kontakt', 'Contact')}</H2>
      <P>
        {L('Telefon', 'Phone')}: <A href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</A>
        <br />
        {L('E-Mail', 'Email')}: <A href={`mailto:${SITE.email}`}>{SITE.email}</A>
        {' · '}
        <A href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</A>
      </P>

      <H2>{L('Umsatzsteuer-ID', 'VAT identification number')}</H2>
      <P>
        {L(
          'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:',
          'VAT identification number pursuant to § 27a German VAT Act:',
        )}{' '}
        <Ph>{L('USt-IdNr. – oder Hinweis auf Kleinunternehmerregelung § 19 UStG', 'VAT ID — or small-business note pursuant to § 19 UStG')}</Ph>
      </P>

      <H2>{L('Registereintrag', 'Commercial register')}</H2>
      <P>{L('Falls im Handelsregister eingetragen (z. B. GmbH/UG):', 'If registered in the commercial register (e.g. GmbH/UG):')}</P>
      <UL>
        <LI>
          {L('Registergericht', 'Registering court')}:{' '}
          <Ph>{L('z. B. Amtsgericht Charlottenburg', 'e.g. Amtsgericht Charlottenburg')}</Ph>
        </LI>
        <LI>
          {L('Registernummer', 'Register number')}: <Ph>{L('z. B. HRB 123456', 'e.g. HRB 123456')}</Ph>
        </LI>
      </UL>

      <H2>{L('Redaktionell verantwortlich (§ 18 Abs. 2 MStV)', 'Responsible for content (§ 18 (2) MStV)')}</H2>
      <P>
        <Ph>{L('Name und Anschrift der verantwortlichen Person', 'Name and address of the responsible person')}</Ph>
      </P>

      <H2>{L('EU-Streitschlichtung', 'EU dispute resolution')}</H2>
      <P>
        {L(
          'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
          'The European Commission provides a platform for online dispute resolution (ODR):',
        )}{' '}
        <A href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</A>.{' '}
        {L('Unsere E-Mail-Adresse finden Sie oben.', 'Our email address is shown above.')}
      </P>
      <P>
        {L(
          'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
          'We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.',
        )}
      </P>

      <H2>{L('Haftung für Inhalte', 'Liability for content')}</H2>
      <P>
        {L(
          'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.',
          'As a service provider we are responsible for our own content on these pages in accordance with § 7 (1) DDG and general law. Pursuant to §§ 8–10 DDG, however, we are not obliged to monitor transmitted or stored third-party information. Obligations to remove or block the use of information under general law remain unaffected.',
        )}
      </P>

      <H2>{L('Haftung für Links', 'Liability for links')}</H2>
      <P>
        {L(
          'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.',
          'Our site contains links to external third-party websites over whose content we have no influence. The respective provider is always responsible for the content of linked pages. We will remove such links immediately upon becoming aware of any legal violations.',
        )}
      </P>

      <H2>{L('Urheberrecht', 'Copyright')}</H2>
      <P>
        {L(
          'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
          'The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing and distribution beyond the limits of copyright require the written consent of the respective author or creator.',
        )}
      </P>

      <Updated>{L('Stand: Entwurf – bitte vor Veröffentlichung prüfen.', 'Status: draft — please review before publishing.')}</Updated>
    </LegalPage>
  )
}
