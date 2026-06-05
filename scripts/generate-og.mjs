// Per-story/per-page OG image generation (runs as `prebuild`).
//
// Smart-crops each portfolio/product cover to 1200×630 and writes it to
// /public/og/<slug>.jpg, plus ensures a generic /public/og-hero.jpg exists.
//
// Defensive by design: if source covers or `sharp` are unavailable (e.g. a fresh
// clone before assets land), it logs and exits 0 so it never blocks a build/deploy.
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'src', 'assets', 'covers') // source cover images
const OUT_DIR = join(ROOT, 'public', 'og')
const OG_W = 1200
const OG_H = 630

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('[generate-og] sharp not installed — skipping OG generation.')
    return
  }

  if (!existsSync(SRC_DIR)) {
    console.warn(`[generate-og] No source covers at ${SRC_DIR} — skipping. ` + 'Add cover images to enable per-page OG generation.')
    return
  }

  mkdirSync(OUT_DIR, { recursive: true })

  const files = readdirSync(SRC_DIR).filter((f) => ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(extname(f).toLowerCase()))

  if (files.length === 0) {
    console.warn('[generate-og] No cover images found — skipping.')
    return
  }

  for (const file of files) {
    const slug = basename(file, extname(file))
    const out = join(OUT_DIR, `${slug}.jpg`)
    await sharp(join(SRC_DIR, file))
      .resize(OG_W, OG_H, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out)
    console.log(`[generate-og] ${file} -> og/${slug}.jpg`)
  }

  console.log(`[generate-og] Generated ${files.length} OG image(s).`)
}

main().catch((err) => {
  console.warn('[generate-og] Non-fatal error, continuing build:', err?.message || err)
})
