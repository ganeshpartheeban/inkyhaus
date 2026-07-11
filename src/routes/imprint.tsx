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
        {SITE.street}
        <br />
        {SITE.postalCode} {SITE.city} ({SITE.district})
        <br />
        {L('Deutschland', 'Germany')}
      </P>

      <H2>{L('Kontakt', 'Contact')}</H2>
      <P>
        {L('Telefon', 'Phone')}: <A href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</A>
        {' · '}
        <A href={`tel:${SITE.phone2.replace(/\s/g, '')}`}>{SITE.phone2}</A>
        <br />
        {L('E-Mail', 'Email')}: <A href={`mailto:${SITE.email}`}>{SITE.email}</A>
        {' · '}
        <A href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</A>
      </P>

      <H2>{L('Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV', 'Responsible for content pursuant to § 18 (2) MStV')}</H2>
      <P>
        {SITE.name}, {SITE.street}, {SITE.postalCode} {SITE.city}
      </P>

      <H2>{L('EU-Streitschlichtung', 'EU dispute resolution')}</H2>
      <P>
        {L(
          'Plattform der EU-Kommission zur Online-Streitbeilegung:',
          'European Commission platform for online dispute resolution:',
        )}{' '}
        <A href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</A>.{' '}
        {L(
          'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
          'We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.',
        )}
      </P>

      <H2>{L('Haftung und Urheberrecht', 'Liability and copyright')}</H2>
      <P>
        {L(
          'Für eigene Inhalte auf diesen Seiten sind wir nach den allgemeinen Gesetzen verantwortlich. Für Inhalte verlinkter externer Seiten ist der jeweilige Anbieter verantwortlich. Die auf dieser Website erstellten Inhalte unterliegen dem deutschen Urheberrecht; eine Verwendung außerhalb der gesetzlichen Grenzen bedarf unserer Zustimmung.',
          'We are responsible for our own content on these pages under general law. The respective provider is responsible for the content of linked external pages. The content created on this website is subject to German copyright law; any use beyond the statutory limits requires our consent.',
        )}
      </P>
    </LegalPage>
  )
}
