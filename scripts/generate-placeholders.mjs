// One-off branded placeholder image generator (run via node).
// Produces og-hero.jpg, apple-touch-icon.png, logo.png and per-page OG images so
// head references resolve until real photography/OG art lands.
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PUB = join(ROOT, 'public')
const OG = join(PUB, 'og')
mkdirSync(OG, { recursive: true })

const INK = '#161a21'
const PAPER = '#f7f4ee'
const ACCENT = '#e0552c'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function ogSvg(rawTitle, accentHue = 35) {
  const title = esc(rawTitle)
  const c1 = `hsl(${accentHue}, 70%, 55%)`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/><stop offset="1" stop-color="#222732"/>
    </linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="1060" cy="120" r="70" fill="${c1}" opacity="0.85"/>
    <text x="80" y="300" font-family="Georgia, serif" font-size="68" fill="${PAPER}" font-weight="600">Inkyhaus</text>
    <text x="80" y="370" font-family="Arial, sans-serif" font-size="34" fill="${PAPER}" opacity="0.8">${title}</text>
    <text x="80" y="560" font-family="Arial, sans-serif" font-size="24" fill="${ACCENT}">Textildruck · Berlin Friedrichshain</text>
  </svg>`
}

function iconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${INK}"/>
    <text x="50%" y="68%" text-anchor="middle" font-family="Georgia, serif" font-size="${size * 0.62}" fill="${PAPER}">i</text>
    <circle cx="${size * 0.72}" cy="${size * 0.3}" r="${size * 0.09}" fill="${ACCENT}"/>
  </svg>`
}

async function svgToJpg(svg, out) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out)
  console.log('wrote', out)
}
async function svgToPng(svg, out) {
  await sharp(Buffer.from(svg)).png().toFile(out)
  console.log('wrote', out)
}

const PAGES = [
  ['t-shirts', 'Custom T-Shirts', 35],
  ['hoodies', 'Custom Hoodies', 280],
  ['workwear', 'Workwear & Corporate', 230],
  ['sportswear', 'Teamwear & Jerseys', 150],
  ['accessories', 'Caps & Tote Bags', 50],
  ['cafe-friedrichshain-crew', 'Café crew shirts', 35],
  ['startup-onboarding-kit', 'Startup onboarding kit', 280],
  ['fussballverein-trikotsatz', 'Football jersey set', 150],
  ['lasergravur', 'Laser engraving', 60],
  ['3d-druck', '3D printing', 205],
  ['werbetechnik', 'Signage & large format', 15],
  ['aufkleber', 'Stickers & vinyl', 330],
  ['geschenke', 'Personalized gifts', 300],
  ['trikot-restauration', 'Jersey restoration', 175],
  ['pokale-medaillen', 'Trophies & medals', 90],
  ['werbeartikel', 'Promo items & branding', 255],
]

await svgToJpg(ogSvg('Custom apparel, printed in Berlin'), join(PUB, 'og-hero.jpg'))
await svgToPng(iconSvg(180), join(PUB, 'apple-touch-icon.png'))
await svgToPng(iconSvg(512), join(PUB, 'logo.png'))
for (const [slug, title, hue] of PAGES) {
  await svgToJpg(ogSvg(title, hue), join(OG, `${slug}.jpg`))
}
console.log('done')
