// Fills every image slot with a curated, license-free stock photo (LoremFlickr,
// Creative Commons) — a stand-in until real Inkyhaus photography arrives.
//
// Robust by design: per slot it tries several keyword sets with retries; if the
// network/service fails, it writes an on-brand generated fallback so NO slot is
// ever left without a real file (and the UI never shows a broken image).
//
// Output: /public/img/<name>.webp (+ .jpg fallback), sized per slot.
// Run: node scripts/fetch-stock.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'img')
mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Each slot: name, width, height, accent hue (for fallback), and ordered keyword sets.
const SLOTS = [
  // hero
  { name: 'hero', w: 1600, h: 1100, accent: 35, kw: ['tshirt,printing,workshop', 'screenprinting', 'apparel'] },
  // apparel covers (4:3)
  { name: 't-shirts', w: 1000, h: 750, accent: 35, kw: ['tshirt,print', 'tshirt', 'apparel'] },
  { name: 'hoodies', w: 1000, h: 750, accent: 280, kw: ['hoodie', 'sweatshirt', 'streetwear'] },
  { name: 'workwear', w: 1000, h: 750, accent: 230, kw: ['workwear,uniform', 'uniform', 'apron'] },
  { name: 'sportswear', w: 1000, h: 750, accent: 150, kw: ['soccer,jersey', 'sports,jersey', 'football,shirt'] },
  { name: 'accessories', w: 1000, h: 750, accent: 50, kw: ['tote,bag', 'baseball,cap', 'cap'] },
  // specialty covers (16:10)
  { name: 'lasergravur', w: 1000, h: 625, accent: 60, kw: ['laser,engraving', 'engraving,wood', 'woodworking'] },
  { name: '3d-druck', w: 1000, h: 625, accent: 205, kw: ['3d,printer', '3dprinting', 'printer'] },
  { name: 'werbetechnik', w: 1000, h: 625, accent: 15, kw: ['banner,sign', 'tradeshow,booth', 'billboard'] },
  { name: 'aufkleber', w: 1000, h: 625, accent: 330, kw: ['sticker', 'vinyl,sticker', 'decal'] },
  { name: 'geschenke', w: 1000, h: 625, accent: 300, kw: ['mug,gift', 'coffee,mug', 'gift'] },
  { name: 'trikot-restauration', w: 1000, h: 625, accent: 175, kw: ['football,jersey', 'vintage,jersey', 'soccer,shirt'] },
  { name: 'pokale-medaillen', w: 1000, h: 625, accent: 90, kw: ['trophy', 'medal', 'award'] },
  { name: 'werbeartikel', w: 1000, h: 625, accent: 255, kw: ['merchandise', 'promotional,product', 'branding'] },
  // technique tiles (square)
  { name: 'tech-full-color', w: 700, h: 700, accent: 35, kw: ['colorful,print', 'fabric,print', 'textile'] },
  { name: 'tech-puff', w: 700, h: 700, accent: 12, kw: ['embroidery,texture', 'fabric,texture', 'textile'] },
  { name: 'tech-glitter', w: 700, h: 700, accent: 320, kw: ['glitter,fabric', 'glitter', 'sparkle'] },
  { name: 'tech-metallic', w: 700, h: 700, accent: 85, kw: ['gold,foil', 'metallic,texture', 'gold'] },
  { name: 'tech-glow', w: 700, h: 700, accent: 145, kw: ['neon,glow', 'neon,light', 'glow'] },
  { name: 'tech-uv', w: 700, h: 700, accent: 265, kw: ['uv,light', 'purple,light', 'neon'] },
  // portfolio covers (4:3)
  { name: 'cafe-friedrichshain-crew', w: 1200, h: 900, accent: 35, kw: ['cafe,staff', 'barista,apron', 'cafe'] },
  { name: 'startup-onboarding-kit', w: 1200, h: 900, accent: 280, kw: ['branded,hoodie', 'merchandise', 'hoodie'] },
  { name: 'fussballverein-trikotsatz', w: 1200, h: 900, accent: 150, kw: ['football,team', 'soccer,team', 'jersey'] },
]

async function tryFetch(url, ms = 25000) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), ms)
  try {
    const r = await fetch(url, { signal: ctrl.signal, redirect: 'follow' })
    if (!r.ok) return null
    const buf = Buffer.from(await r.arrayBuffer())
    if (buf.length < 2000) return null // tiny = error page
    // validate it's a real image sharp can read
    await sharp(buf).metadata()
    return buf
  } catch {
    return null
  } finally {
    clearTimeout(id)
  }
}

function fallbackSvg(slot) {
  const { w, h, accent, name } = slot
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${accent},45%,42%)"/>
        <stop offset="1" stop-color="hsl(${accent},70%,58%)"/></linearGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
      <text x="${w / 2}" y="${h / 2}" text-anchor="middle" dominant-baseline="middle"
        font-family="Georgia, serif" font-size="${Math.round(h * 0.07)}" fill="white" opacity="0.75">${esc(name)}</text>
    </svg>`,
  )
}

async function getImage(slot) {
  for (let k = 0; k < slot.kw.length; k++) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const lock = 100 + k * 10 + attempt
      const url = `https://loremflickr.com/${slot.w}/${slot.h}/${slot.kw[k]}?lock=${lock}`
      const buf = await tryFetch(url)
      if (buf) return { buf, source: `loremflickr:${slot.kw[k]}` }
      await sleep(600)
    }
  }
  return { buf: fallbackSvg(slot), source: 'fallback-art' }
}

let ok = 0
let fb = 0
for (const slot of SLOTS) {
  const { buf, source } = await getImage(slot)
  const base = sharp(buf).resize(slot.w, slot.h, { fit: 'cover', position: 'attention' })
  await base.clone().webp({ quality: 72 }).toFile(join(OUT, `${slot.name}.webp`))
  await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(join(OUT, `${slot.name}.jpg`))
  if (source === 'fallback-art') fb++
  else ok++
  console.log(`${slot.name.padEnd(26)} <- ${source}`)
  await sleep(300)
}

// Attribution note (LoremFlickr serves Creative Commons Flickr images).
writeFileSync(
  join(OUT, 'CREDITS.txt'),
  'Placeholder imagery via LoremFlickr (Creative Commons, Flickr). ' +
    'Replace with licensed Inkyhaus photography before launch.\n',
)

console.log(`\nDone. ${ok} stock, ${fb} branded-fallback, ${SLOTS.length} total.`)
