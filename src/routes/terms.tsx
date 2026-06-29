import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'
import { useI18n, DEFAULT_LOCALE } from '../lib/i18n'
import { SITE } from '../lib/site-config'
import { LegalPage } from '../components/LegalPage'
import { H2, P, UL, LI, A, Ph, Disclaimer, Updated } from '../components/legal-ui'

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
      <Disclaimer>
        {L(
          'Vorlage – keine Rechtsberatung. Diese AGB bilden die auf der Website genannten Eckdaten ab, müssen aber vor dem Launch anwaltlich geprüft und mit den echten Angaben ([markiert], u. a. Anbieter, Zahlungsarten, Widerrufsbelehrung) vervollständigt werden. Für Verbraucher ist zusätzlich eine separate Widerrufsbelehrung erforderlich.',
          'Template — not legal advice. These terms reflect the key facts stated on the website but must be reviewed by a lawyer and completed with your real details ([highlighted], incl. provider, payment methods, cancellation policy) before launch. For consumers, a separate cancellation policy is additionally required.',
        )}
      </Disclaimer>

      <H2>{L('§ 1 Geltungsbereich', '§ 1 Scope')}</H2>
      <P>
        {L(
          'Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen und Aufträge zwischen ',
          'These general terms and conditions apply to all orders and contracts between ',
        )}
        <Ph>{L('Anbieter/Firmenname', 'provider/company name')}</Ph>
        {L(
          ` (nachfolgend „Anbieter“), ${SITE.street}, ${SITE.postalCode} ${SITE.city}, und ihren Kundinnen und Kunden (nachfolgend „Kunde“) über Druck-, Veredelungs-, Gravur- und Werbeproduktdienstleistungen.`,
          ` (hereinafter “Provider”), ${SITE.street}, ${SITE.postalCode} ${SITE.city}, and its customers (hereinafter “Customer”) for printing, finishing, engraving and promotional-product services.`,
        )}
      </P>

      <H2>{L('§ 2 Angebot und Vertragsschluss', '§ 2 Offer and conclusion of contract')}</H2>
      <P>
        {L(
          'Die Darstellung der Leistungen auf der Website stellt kein bindendes Angebot dar. Nach Ihrer Anfrage (Formular, E-Mail, Telefon, WhatsApp oder vor Ort) erstellt der Anbieter ein individuelles Angebot. Der Vertrag kommt zustande, wenn der Kunde das Angebot annimmt bzw. der Anbieter den Auftrag bestätigt. Angebote sind freibleibend, sofern nicht ausdrücklich als verbindlich bezeichnet.',
          'The presentation of services on the website does not constitute a binding offer. Following your enquiry (form, email, phone, WhatsApp or in store), the Provider prepares an individual quote. The contract is concluded when the Customer accepts the quote or the Provider confirms the order. Quotes are non-binding unless expressly designated as binding.',
        )}
      </P>

      <H2>{L('§ 3 Preise und Mindestbestellmenge', '§ 3 Prices and minimum order')}</H2>
      <P>
        {L(
          `Es gibt keine Mindestbestellmenge – Bestellungen sind ab ${SITE.minOrder} Stück möglich. Es gelten die im jeweiligen Angebot genannten Preise. `,
          `There is no minimum order quantity — orders are possible from ${SITE.minOrder} item. The prices stated in the respective quote apply. `,
        )}
        <Ph>{L('Hinweis zur Umsatzsteuer (ausgewiesen / § 19 UStG)', 'VAT note (shown / § 19 UStG small business)')}</Ph>
      </P>

      <H2>{L('§ 4 Kundeninhalte und Druckdaten', '§ 4 Customer content and print data')}</H2>
      <P>
        {L(
          'Der Kunde versichert, dass er an allen übermittelten Inhalten (Logos, Grafiken, Texte, Fotos, Marken) die erforderlichen Rechte besitzt und dass deren Nutzung keine Rechte Dritter (insb. Urheber-, Marken- und Persönlichkeitsrechte) verletzt. Der Kunde stellt den Anbieter von Ansprüchen Dritter frei, die aus einer Rechtsverletzung der überlassenen Inhalte entstehen. Der Anbieter ist berechtigt, Aufträge mit rechtswidrigen, beleidigenden oder sittenwidrigen Inhalten abzulehnen.',
          'The Customer warrants that they hold all necessary rights to the content submitted (logos, graphics, text, photos, trademarks) and that its use does not infringe any third-party rights (in particular copyright, trademark and personality rights). The Customer indemnifies the Provider against third-party claims arising from a rights infringement of the supplied content. The Provider may refuse orders containing unlawful, offensive or immoral content.',
        )}
      </P>

      <H2>{L('§ 5 Produktionszeiten und Express', '§ 5 Production times and express')}</H2>
      <P>
        {L(
          `Übliche Produktionszeiten liegen bei ${SITE.productionHours}; ein Express-Service ist nach Verfügbarkeit möglich. Angegebene Zeiten sind Richtwerte und nur dann verbindlich, wenn sie ausdrücklich schriftlich zugesagt wurden. Verzögerungen durch unvollständige oder fehlerhafte Druckdaten gehen nicht zu Lasten des Anbieters.`,
          `Typical production times are ${SITE.productionHours}; an express service is available subject to capacity. Stated times are guideline values and only binding if expressly confirmed in writing. Delays caused by incomplete or faulty print data are not attributable to the Provider.`,
        )}
      </P>

      <H2>{L('§ 6 Lieferung und Abholung', '§ 6 Delivery and pickup')}</H2>
      <P>
        {L(
          `Innerhalb Berlins liefern wir ab einem Bestellwert von ${SITE.freeDeliveryFrom} € versandkostenfrei; im Übrigen gelten die im Angebot genannten Versandkosten. Eine Abholung im Studio in ${SITE.city}-${SITE.district} ist nach Absprache möglich.`,
          `Within Berlin we deliver free of charge from an order value of €${SITE.freeDeliveryFrom}; otherwise the shipping costs stated in the quote apply. Pickup at the studio in ${SITE.city}-${SITE.district} is possible by arrangement.`,
        )}
      </P>

      <H2>{L('§ 7 Zahlung', '§ 7 Payment')}</H2>
      <P>
        <Ph>{L('Zahlungsarten und -bedingungen (z. B. Vorkasse, Rechnung, vor Ort) ergänzen.', 'Add payment methods and terms (e.g. advance payment, invoice, in store).')}</Ph>
      </P>

      <H2>{L('§ 8 Widerrufsrecht bei Verbrauchern', '§ 8 Right of withdrawal for consumers')}</H2>
      <P>
        {L(
          'Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu. Dieses besteht jedoch nicht bei Verträgen zur Lieferung von Waren, die nach Kundenspezifikation angefertigt werden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB). Da unsere Produkte individuell bedruckt, graviert bzw. personalisiert werden, ist das Widerrufsrecht für diese Artikel regelmäßig ausgeschlossen.',
          'Consumers generally have a statutory right of withdrawal. However, this does not apply to contracts for the supply of goods that are made to the customer’s specifications or are clearly tailored to personal requirements (§ 312g (2) no. 1 German Civil Code). As our products are individually printed, engraved or personalised, the right of withdrawal is generally excluded for these items.',
        )}
      </P>
      <P>
        <Ph>{L('Vollständige Widerrufsbelehrung + Muster-Widerrufsformular für nicht personalisierte Artikel ergänzen.', 'Add a full cancellation policy + model withdrawal form for non-personalised items.')}</Ph>
      </P>

      <H2>{L('§ 9 Gewährleistung und Farbabweichungen', '§ 9 Warranty and colour deviations')}</H2>
      <P>
        {L(
          'Es gelten die gesetzlichen Gewährleistungsrechte. Technisch bedingte, geringfügige Abweichungen in Farbe, Material oder Position (z. B. zwischen Bildschirmdarstellung und Druckergebnis oder zwischen Produktionschargen) stellen keinen Mangel dar. Offensichtliche Mängel sind unverzüglich nach Erhalt anzuzeigen.',
          'Statutory warranty rights apply. Minor, technically unavoidable deviations in colour, material or position (e.g. between on-screen display and print result, or between production batches) do not constitute a defect. Obvious defects must be reported without delay upon receipt.',
        )}
      </P>

      <H2>{L('§ 10 Haftung', '§ 10 Liability')}</H2>
      <P>
        {L(
          'Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie nach dem Produkthaftungsgesetz und bei Verletzung von Leben, Körper oder Gesundheit. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung ausgeschlossen.',
          'The Provider is liable without limitation in cases of intent and gross negligence as well as under the Product Liability Act and for injury to life, body or health. In the case of slightly negligent breach of material contractual obligations, liability is limited to the foreseeable damage typical for the contract. Otherwise liability is excluded.',
        )}
      </P>

      <H2>{L('§ 11 Eigentumsvorbehalt', '§ 11 Retention of title')}</H2>
      <P>
        {L(
          'Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum des Anbieters.',
          'The delivered goods remain the property of the Provider until full payment has been received.',
        )}
      </P>

      <H2>{L('§ 12 Schlussbestimmungen', '§ 12 Final provisions')}</H2>
      <P>
        {L(
          'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit dadurch zwingende Verbraucherschutzvorschriften des Aufenthaltsstaates nicht eingeschränkt werden. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
          'The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods. Vis-à-vis consumers, this choice of law applies only to the extent that it does not restrict mandatory consumer protection provisions of their country of residence. Should individual provisions be invalid, the validity of the remaining provisions remains unaffected.',
        )}
      </P>
      <P>
        {L('Kontakt: ', 'Contact: ')}
        <A href={`mailto:${SITE.email}`}>{SITE.email}</A> · <A href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</A>
      </P>

      <Updated>{L('Stand: Entwurf – bitte vor Veröffentlichung prüfen.', 'Status: draft — please review before publishing.')}</Updated>
    </LegalPage>
  )
}
