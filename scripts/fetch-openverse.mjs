// Fills unmatched image slots with RELEVANT, license-free photos from Openverse
// (openly-licensed media; filtered to commercial-use + modification). Each slot
// has a curated query. Picks the first candidate that downloads, is a real
// raster image, and is large enough. Writes attribution to public/img/CREDITS.txt.
//
// Run: node scripts/fetch-openverse.mjs
import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'img')
mkdirSync(OUT, { recursive: true })
const UA = 'InkyhausSiteBuilder/1.0 (placeholder imagery)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// name = output file (without .webp); q = search query; w,h = target size.
const SLOTS = [
  // apparel (4:3)
  { name: 't-shirts', q: 'screen printing t-shirt workshop', w: 1000, h: 750 },
  { name: 'hoodies', q: 'hoodie sweatshirt clothing', w: 1000, h: 750 },
  { name: 'workwear', q: 'work uniform polo staff apron', w: 1000, h: 750 },
  { name: 'sportswear', q: 'soccer football jersey team', w: 1000, h: 750 },
  { name: 'accessories', q: 'canvas tote bag', w: 1000, h: 750 },
  // specialty (16:10)
  { name: '3d-druck', q: '3d printer printing machine', w: 1000, h: 625 },
  { name: 'aufkleber', q: 'vinyl stickers decals', w: 1000, h: 625 },
  { name: 'trikot-restauration', q: 'football jersey shirt', w: 1000, h: 625 },
  { name: 'pokale-medaillen', q: 'trophy award medal', w: 1000, h: 625 },
  { name: 'werbeartikel', q: 'promotional branded merchandise', w: 1000, h: 625 },
  // techniques (square)
  { name: 'tech-full-color', q: 'colorful printed fabric textile', w: 700, h: 700 },
  { name: 'tech-puff', q: 'fabric texture print detail', w: 700, h: 700 },
  { name: 'tech-glitter', q: 'glitter sparkle texture', w: 700, h: 700 },
  { name: 'tech-metallic', q: 'gold foil metallic texture', w: 700, h: 700 },
  { name: 'tech-glow', q: 'neon glow light', w: 700, h: 700 },
  { name: 'tech-uv', q: 'ultraviolet neon purple light', w: 700, h: 700 },
  // portfolio (4:3)
  { name: 'cafe-friedrichshain-crew', q: 'cafe barista staff apron', w: 1200, h: 900 },
  { name: 'startup-onboarding-kit', q: 'branded hoodie merchandise office', w: 1200, h: 900 },
  { name: 'fussballverein-trikotsatz', q: 'football team players jersey', w: 1200, h: 900 },
]

async function search(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial,modification&page_size=12&mature=false`
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } })
      if (r.status === 429) {
        await sleep(4000)
        continue
      }
      if (!r.ok) return []
      const j = await r.json()
      return j.results || []
    } catch {
      await sleep(1500)
    }
  }
  return []
}

async function download(u) {
  try {
    const ctrl = new AbortController()
    const id = setTimeout(() => ctrl.abort(), 25000)
    const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: ctrl.signal, redirect: 'follow' })
    clearTimeout(id)
    if (!r.ok) return null
    const buf = Buffer.from(await r.arrayBuffer())
    if (buf.length < 4000) return null
    const meta = await sharp(buf).metadata()
    if (!meta.width || meta.width < 600) return null
    return { buf, meta }
  } catch {
    return null
  }
}

const credits = ['# Placeholder imagery — Openverse (openly licensed). Replace with real Inkyhaus photos before launch.', '']
let ok = 0

for (const slot of SLOTS) {
  const results = await search(slot.q)
  let done = false
  for (const cand of results) {
    const src = cand.url
    if (!src) continue
    const got = await download(src)
    if (!got) continue
    await sharp(got.buf).resize(slot.w, slot.h, { fit: 'cover', position: 'attention' }).webp({ quality: 78 }).toFile(join(OUT, `${slot.name}.webp`))
    credits.push(`${slot.name}.webp  "${(cand.title || '').slice(0, 60)}" by ${cand.creator || '?'} (${cand.license} ${cand.license_version || ''}) — ${cand.foreign_landing_url || src}`)
    console.log(`${slot.name.padEnd(26)} <- ${cand.license} | ${(cand.title || '').slice(0, 45)}`)
    ok++
    done = true
    break
  }
  if (!done) console.log(`${slot.name.padEnd(26)} <- (no candidate)`)
  await sleep(900)
}

writeFileSync(join(OUT, 'CREDITS.txt'), credits.join('\n') + '\n')
console.log(`\nDone. ${ok}/${SLOTS.length} filled.`)
