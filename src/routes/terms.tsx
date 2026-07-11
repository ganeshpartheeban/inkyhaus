import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { LegalPage } from '../components/LegalPage'
import { H2, P, A } from '../components/legal-ui'

export const Route = createFileRoute('/terms')({
  head: () =>
    pageHead({
      title: 'AGB · Inkyhaus',
      description: 'Allgemeine Geschäftsbedingungen von Inkyhaus.',
      path: '/terms',
      locale: DEFAULT_LOCALE,
      noindex: true,
    }),
  component: Terms,
})

function Terms() {
  const { locale } = useI18n()
  const L = (de: string, en: string) => (locale === 'en' ? en : de)

  return (
    <LegalPage titleKeyDe="Allgemeine Geschäftsbedingungen (AGB)" titleEn="Terms & Conditions">
      <H2>{L('§ 1 Geltungsbereich', '§ 1 Scope')}</H2>
      <P>
        {L(
          `Diese Bedingungen gelten für alle Aufträge zwischen ${SITE.name}, ${SITE.street}, ${SITE.postalCode} ${SITE.city} (nachfolgend „Anbieter“), und ihren Kundinnen und Kunden über Druck-, Veredelungs-, Gravur- und Werbeproduktdienstleistungen.`,
          `These terms apply to all orders between ${SITE.name}, ${SITE.street}, ${SITE.postalCode} ${SITE.city} (the “Provider”), and its customers for printing, finishing, engraving and promotional-product services.`,
        )}
      </P>

      <H2>{L('§ 2 Angebot und Vertragsschluss', '§ 2 Offer and conclusion of contract')}</H2>
      <P>
        {L(
          'Die Darstellung der Leistungen auf der Website ist kein bindendes Angebot. Nach Ihrer Anfrage erstellen wir ein individuelles Angebot. Der Vertrag kommt mit Ihrer Annahme bzw. unserer Auftragsbestätigung zustande. Angebote sind freibleibend, sofern nicht ausdrücklich als verbindlich bezeichnet.',
          'The presentation of services on the website is not a binding offer. After your enquiry we prepare an individual quote. The contract is concluded upon your acceptance or our order confirmation. Quotes are non-binding unless expressly marked as binding.',
        )}
      </P>

      <H2>{L('§ 3 Preise und Mindestbestellmenge', '§ 3 Prices and minimum order')}</H2>
      <P>
        {L(
          `Es gibt keine Mindestbestellmenge – Bestellungen sind ab ${SITE.minOrder} Stück möglich. Es gelten die im jeweiligen Angebot genannten Preise.`,
          `There is no minimum order quantity — orders are possible from ${SITE.minOrder} item. The prices stated in the respective quote apply.`,
        )}
      </P>

      <H2>{L('§ 4 Kundeninhalte und Druckdaten', '§ 4 Customer content and print data')}</H2>
      <P>
        {L(
          'Der Kunde versichert, an allen übermittelten Inhalten (Logos, Grafiken, Texte, Fotos, Marken) die erforderlichen Rechte zu besitzen, und stellt uns von Ansprüchen Dritter frei, die aus einer Rechtsverletzung dieser Inhalte entstehen. Aufträge mit rechtswidrigen Inhalten können wir ablehnen.',
          'The customer warrants that they hold all necessary rights to the content submitted (logos, graphics, text, photos, trademarks) and indemnifies us against third-party claims arising from any rights infringement of that content. We may refuse orders with unlawful content.',
        )}
      </P>

      <H2>{L('§ 5 Produktionszeiten und Lieferung', '§ 5 Production times and delivery')}</H2>
      <P>
        {L(
          `Übliche Produktionszeiten liegen bei ${SITE.productionHours}; ein Express-Service ist nach Verfügbarkeit möglich. Angegebene Zeiten sind Richtwerte und nur bei ausdrücklicher Zusage verbindlich. Innerhalb Berlins liefern wir ab ${SITE.freeDeliveryFrom} € versandkostenfrei; eine Abholung im Studio in ${SITE.city}-${SITE.district} ist nach Absprache möglich.`,
          `Typical production times are ${SITE.productionHours}; express is available subject to capacity. Stated times are guideline values and only binding if expressly confirmed. Within Berlin we deliver free of charge from €${SITE.freeDeliveryFrom}; pickup at the studio in ${SITE.city}-${SITE.district} is possible by arrangement.`,
        )}
      </P>

      <H2>{L('§ 6 Zahlung', '§ 6 Payment')}</H2>
      <P>
        {L(
          'Die Zahlungsmodalitäten werden im jeweiligen Angebot bzw. bei Auftragsbestätigung mitgeteilt.',
          'Payment terms are communicated in the respective quote or upon order confirmation.',
        )}
      </P>

      <H2>{L('§ 7 Widerrufsrecht bei Verbrauchern', '§ 7 Right of withdrawal for consumers')}</H2>
      <P>
        {L(
          'Da unsere Produkte individuell bedruckt, graviert bzw. personalisiert werden, ist das gesetzliche Widerrufsrecht für nach Kundenspezifikation angefertigte Waren gemäß § 312g Abs. 2 Nr. 1 BGB in der Regel ausgeschlossen.',
          'As our products are individually printed, engraved or personalised, the statutory right of withdrawal for goods made to the customer’s specifications is generally excluded pursuant to § 312g (2) no. 1 German Civil Code.',
        )}
      </P>

      <H2>{L('§ 8 Gewährleistung und Farbabweichungen', '§ 8 Warranty and colour deviations')}</H2>
      <P>
        {L(
          'Es gelten die gesetzlichen Gewährleistungsrechte. Technisch bedingte, geringfügige Abweichungen in Farbe, Material oder Position (z. B. zwischen Bildschirm und Druck) stellen keinen Mangel dar. Offensichtliche Mängel sind unverzüglich nach Erhalt anzuzeigen.',
          'Statutory warranty rights apply. Minor, technically unavoidable deviations in colour, material or position (e.g. between screen and print) do not constitute a defect. Obvious defects must be reported without delay upon receipt.',
        )}
      </P>

      <H2>{L('§ 9 Schlussbestimmungen', '§ 9 Final provisions')}</H2>
      <P>
        {L(
          'Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts; zwingende Verbraucherschutzvorschriften bleiben unberührt. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.',
          'German law applies, excluding the UN Convention on Contracts for the International Sale of Goods; mandatory consumer protection provisions remain unaffected. Should individual provisions be invalid, the validity of the remaining provisions is unaffected.',
        )}
      </P>
      <P>
        {L('Kontakt: ', 'Contact: ')}
        <A href={`mailto:${SITE.email}`}>{SITE.email}</A> · <A href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</A> ·{' '}
        <A href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</A> ·{' '}
        <A href={`tel:${SITE.phone2.replace(/\s/g, '')}`}>{SITE.phone2}</A>
      </P>
    </LegalPage>
  )
}
