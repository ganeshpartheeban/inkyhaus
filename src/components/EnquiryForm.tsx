// Enquiry / quote form. Backend = Google Apps Script (no server). Combines the
// Build Brief patterns: client submission (§11f), deferred IP-geo lookup (§11g),
// and localStorage per-email rate-limit (§11h). Lazy-loaded by the contact route.
import { useRef, useState } from 'react'
import { useI18n } from '../lib/i18n'
import { FORM_ENDPOINT, FORM_TOKEN } from '../lib/form-config'
import { resolveLocation, withTimeout } from '../lib/location'
import { getSubmittedCount, recordSubmission, MAX_PER_EMAIL } from '../lib/rate-limit'
import { whatsappLink } from '../lib/site-config'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'limit'

const ENQUIRY_TYPES_DE = ['T-Shirts', 'Hoodies', 'Arbeitskleidung', 'Teamwear / Trikots', 'Accessoires', 'Express', 'Firmenauftrag', 'Sonstiges']
const ENQUIRY_TYPES_EN = ['T-Shirts', 'Hoodies', 'Workwear', 'Teamwear / Jerseys', 'Accessories', 'Express', 'Corporate order', 'Other']

export function EnquiryForm() {
  const { t, locale } = useI18n()
  const [status, setStatus] = useState<Status>('idle')

  // Deferred IP-geo lookup (fired on first focus, awaited briefly on submit).
  const locationRef = useRef<string>('')
  const locationPromiseRef = useRef<Promise<void> | null>(null)

  const ensureLocationLookup = () => {
    if (locationPromiseRef.current) return
    locationPromiseRef.current = resolveLocation()
      .then((loc) => {
        locationRef.current = loc
      })
      .catch(() => {
        // All providers blocked / offline — submit goes through with empty location.
      })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '').trim()

    if (getSubmittedCount(email) >= MAX_PER_EMAIL) {
      setStatus('limit')
      return
    }

    setStatus('sending')

    data.set('token', FORM_TOKEN)
    data.set('type', 'enquiry')
    data.set('source', window.location.pathname)
    data.set('userAgent', navigator.userAgent)

    // Wait up to 2s for the geo lookup, then send regardless.
    if (!locationRef.current && locationPromiseRef.current) {
      try {
        await withTimeout(locationPromiseRef.current, 2000)
      } catch {
        /* proceed without location */
      }
    }
    data.set('location', locationRef.current)

    try {
      await fetch(FORM_ENDPOINT, { method: 'POST', body: data, mode: 'no-cors' })
      recordSubmission(email) // only on successful POST
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const types = locale === 'en' ? ENQUIRY_TYPES_EN : ENQUIRY_TYPES_DE

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-line bg-accent-soft/60 p-8 text-center">
        <p className="font-serif text-2xl">{t('form.success')}</p>
      </div>
    )
  }

  return (
    <form onFocusCapture={ensureLocationLookup} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('form.name')} required>
          <input name="name" required autoComplete="name" className={inputCls} />
        </Field>
        <Field label={t('form.email')} required>
          <input name="email" type="email" required autoComplete="email" className={inputCls} />
        </Field>
        <Field label={t('form.phone')}>
          <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
        <Field label={t('form.eventType')}>
          <select name="eventType" className={inputCls} defaultValue="">
            <option value="" disabled>
              —
            </option>
            {types.map((ty) => (
              <option key={ty} value={ty}>
                {ty}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('form.quantity')}>
          <input name="budget" inputMode="numeric" placeholder="1, 10, 50 …" className={inputCls} />
        </Field>
        <Field label={t('form.date')}>
          <input name="date" type="date" className={inputCls} />
        </Field>
      </div>
      <Field label={t('form.message')} required>
        <textarea name="message" required rows={4} className={inputCls} />
      </Field>

      {status === 'limit' && <p className="text-sm text-accent-strong">{t('form.limit')}</p>}
      {status === 'error' && (
        <p className="text-sm text-accent-strong">
          {t('form.error')}{' '}
          <a className="underline" href={whatsappLink('Hallo Inkyhaus, mein Formular ging nicht durch.')} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 font-medium text-white transition-transform active:scale-[0.985] disabled:opacity-60 motion-reduce:transition-none hover:bg-accent-strong sm:w-auto"
      >
        {status === 'sending' ? t('form.sending') : t('form.submit')}
      </button>
    </form>
  )
}

const inputCls =
  'w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:bg-surface'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  )
}

export default EnquiryForm
