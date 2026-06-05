// Gallery/product image variant generation (run manually via `npm run images`).
//
// Reads source images from src/assets/gallery and emits AVIF + WebP + JPEG at
// multiple widths into /public/gallery-thumbs, plus a full-res variant into
// /public/gallery-full. EXIF is read for capture metadata where present.
//
// Defensive: no-ops cleanly when sources or deps are missing.
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'src', 'assets', 'gallery')
const THUMB_DIR = join(ROOT, 'public', 'gallery-thumbs')
const FULL_DIR = join(ROOT, 'public', 'gallery-full')
const WIDTHS = [480, 600, 800, 1000, 1400]
const FULL_WIDTH = 2000

async function main() {
  let sharp, exifr
  try {
    sharp = (await import('sharp')).default
    exifr = await import('exifr')
  } catch {
    console.warn('[generate-images] sharp/exifr not installed — skipping.')
    return
  }

  if (!existsSync(SRC_DIR)) {
    console.warn(`[generate-images] No sources at ${SRC_DIR} — skipping.`)
    return
  }

  mkdirSync(THUMB_DIR, { recursive: true })
  mkdirSync(FULL_DIR, { recursive: true })

  const files = readdirSync(SRC_DIR).filter((f) => ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()))

  for (const file of files) {
    const slug = basename(file, extname(file))
    const input = join(SRC_DIR, file)

    try {
      const meta = await exifr.parse(input).catch(() => null)
      if (meta?.DateTimeOriginal) {
        console.log(`[generate-images] ${file} captured ${meta.DateTimeOriginal}`)
      }
    } catch {
      /* EXIF optional */
    }

    for (const w of WIDTHS) {
      const base = sharp(input).resize(w, null, { withoutEnlargement: true })
      await base.clone().avif({ quality: 55 }).toFile(join(THUMB_DIR, `${slug}-${w}.avif`))
      await base.clone().webp({ quality: 72 }).toFile(join(THUMB_DIR, `${slug}-${w}.webp`))
      await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(join(THUMB_DIR, `${slug}-${w}.jpg`))
    }

    await sharp(input)
      .resize(FULL_WIDTH, null, { withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(join(FULL_DIR, `${slug}.jpg`))

    console.log(`[generate-images] ${file} -> ${WIDTHS.length} thumb widths + full`)
  }

  console.log(`[generate-images] Processed ${files.length} image(s).`)
}

main().catch((err) => {
  console.warn('[generate-images] Non-fatal error:', err?.message || err)
})
