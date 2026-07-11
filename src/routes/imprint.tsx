import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { LegalPage } from '../components/LegalPage'
import { H2, P, A } from '../components/legal-ui'

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
      <H2>{L('Angaben gemäß § 5 DDG', 'Information pursuant to § 5 DDG')}</H2>
      <P>
        {SITE.name}
        <br />
        {L('Inhaber', 'Owner')}: {SITE.founder.name}
        <br />
        {SITE.street}
        <br />
        {SITE.postalCode} {SITE.city}
        <br />
        {L('Deutschland', 'Germany')}
      </P>

      <H2>{L('Kontakt', 'Contact')}</H2>
      <P>
        {L('Telefon', 'Phone')}: <A href={`tel:${SITE.phone2.replace(/\s/g, '')}`}>{SITE.phone2}</A>
        <br />
        {L('E-Mail', 'Email')}: <A href={`mailto:${SITE.email}`}>{SITE.email}</A>
        <br />
        {L('Alternative E-Mail', 'Alternative email')}: <A href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</A>
      </P>

      <H2>{L('Vertretungsberechtigter', 'Authorised representative')}</H2>
      <P>
        {SITE.founder.name} {L('(Einzelunternehmer)', '(sole proprietor)')}
      </P>

      <H2>{L('Umsatzsteuer-Identifikationsnummer', 'VAT identification number')}</H2>
      <P>
        {L(
          'Keine Umsatzsteuer-Identifikationsnummer vorhanden.',
          'No VAT identification number available.',
        )}
      </P>

      <H2>{L('Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV', 'Responsible for content pursuant to § 18 (2) MStV')}</H2>
      <P>
        {SITE.founder.name}
        <br />
        {SITE.street}
        <br />
        {SITE.postalCode} {SITE.city}
        <br />
        {L('Deutschland', 'Germany')}
      </P>

      <H2>{L('Streitschlichtung', 'Dispute resolution')}</H2>
      <P>
        {L(
          'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
          'The European Commission provides a platform for online dispute resolution (ODR):',
        )}{' '}
        <A href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr</A>.{' '}
        {L('Unsere E-Mail-Adresse finden Sie oben im Impressum.', 'You can find our email address in the legal notice above.')}
      </P>
      <P>
        {L(
          'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
          'We are neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.',
        )}
      </P>

      <H2>{L('Haftung für Inhalte', 'Liability for content')}</H2>
      <P>
        {L(
          'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
          'As a service provider, we are responsible for our own content on these pages in accordance with Section 7 (1) of the German Digital Services Act (DDG). However, according to Sections 8 to 10 of the DDG, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.',
        )}
      </P>
      <P>
        {L(
          'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
          'Obligations to remove or block the use of information under general law remain unaffected. However, liability in this respect is only possible from the point at which we become aware of a specific legal infringement. Upon becoming aware of such legal infringements, we will remove the content in question immediately.',
        )}
      </P>

      <H2>{L('Haftung für Links', 'Liability for links')}</H2>
      <P>
        {L(
          'Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
          'Our website contains links to external websites of third parties, over whose content we have no control. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time the links were created. Illegal content was not identified at the time the links were created.',
        )}
      </P>
      <P>
        {L(
          'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
          'However, continuously monitoring the content of linked pages is unreasonable without concrete evidence of a legal violation. Upon becoming aware of any legal violations, we will remove such links immediately.',
        )}
      </P>

      <H2>{L('Urheberrecht', 'Copyright')}</H2>
      <P>
        {L(
          'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
          'The content and works created by the website operators on these pages are subject to German copyright law. Reproduction, processing, distribution, and any form of exploitation beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are permitted only for private, non-commercial use.',
        )}
      </P>
      <P>
        {L(
          'Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
          'Where content on this site has not been created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please notify us accordingly. Upon notification of any legal violations, we will remove such content immediately.',
        )}
      </P>
    </LegalPage>
  )
}
