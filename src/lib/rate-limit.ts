// localStorage-based soft per-email submission cap (Build Brief §11h).
// Server-side validation in the Apps Script remains the real ceiling; this only
// blocks the casual repeat-clicker on the same device.
const SUBMISSIONS_KEY = 'inkyhaus-enquiry-emails'
export const MAX_PER_EMAIL = 5

export function getSubmittedCount(email: string): number {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY)
    const map: Record<string, number> = raw ? JSON.parse(raw) : {}
    return map[email.toLowerCase().trim()] ?? 0
  } catch {
    return 0
  }
}

export function recordSubmission(email: string) {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY)
    const map: Record<string, number> = raw ? JSON.parse(raw) : {}
    const key = email.toLowerCase().trim()
    map[key] = (map[key] ?? 0) + 1
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(map))
  } catch {
    // localStorage may be unavailable (private mode, storage quota).
    // Server-side validation in the Apps Script remains the real ceiling.
  }
}
