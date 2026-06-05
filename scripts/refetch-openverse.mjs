// Re-fetch specific slots with refined queries (tries several per slot).
import { appendFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = join(process.cwd(), 'public', 'img')
const UA = 'InkyhausSiteBuilder/1.0'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const SLOTS = [
  { name: 't-shirts', w: 1000, h: 750, qs: ['blank t-shirts clothing rack', 'printed tshirts stack', 'white t-shirt mockup'] },
  { name: 'hoodies', w: 1000, h: 750, qs: ['person wearing hoodie', 'hooded sweatshirt streetwear', 'grey hoodie'] },
  { name: 'workwear', w: 1000, h: 750, qs: ['worker overalls uniform', 'mechanic workwear', 'chef kitchen staff uniform'] },
  { name: '3d-druck', w: 1000, h: 625, qs: ['3d printer machine plastic', 'fused filament fabrication', '3d printed object'] },
  { name: 'tech-uv', w: 700, h: 700, qs: ['blacklight neon paint', 'ultraviolet fluorescent paint', 'glow paint party'] },
  { name: 'trikot-restauration', w: 1000, h: 625, qs: ['vintage football shirt', 'retro soccer jersey', 'old football kit'] },
  { name: 'cafe-friedrichshain-crew', w: 1200, h: 900, qs: ['barista coffee shop counter', 'cafe staff apron', 'coffee shop interior'] },
  { name: 'startup-onboarding-kit', w: 1200, h: 900, qs: ['startup team office casual', 'office team meeting', 'branded hoodie merchandise'] },
]

async function search(q) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial,modification&page_size=12&mature=false`
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } })
      if (r.status === 429) { await sleep(4000); continue }
      if (!r.ok) return []
      return (await r.json()).results || []
    } catch { await sleep(1500) }
  }
  return []
}
async function dl(u) {
  try {
    const c = new AbortController(); const id = setTimeout(() => c.abort(), 25000)
    const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: c.signal, redirect: 'follow' })
    clearTimeout(id); if (!r.ok) return null
    const buf = Buffer.from(await r.arrayBuffer()); if (buf.length < 4000) return null
    const m = await sharp(buf).metadata(); if (!m.width || m.width < 600) return null
    return { buf, m }
  } catch { return null }
}

const credits = ['', '# Re-fetched:']
for (const slot of SLOTS) {
  let done = false
  for (const q of slot.qs) {
    const results = await search(q)
    for (const cand of results) {
      if (!cand.url) continue
      const got = await dl(cand.url)
      if (!got) continue
      // prefer landscape for wide slots
      if (slot.w > slot.h && got.m.height > got.m.width * 1.2) continue
      await sharp(got.buf).resize(slot.w, slot.h, { fit: 'cover', position: 'attention' }).webp({ quality: 78 }).toFile(join(OUT, `${slot.name}.webp`))
      credits.push(`${slot.name}.webp  "${(cand.title || '').slice(0, 60)}" by ${cand.creator || '?'} (${cand.license}) — ${cand.foreign_landing_url || cand.url}`)
      console.log(`${slot.name.padEnd(26)} <- [${q}] ${cand.license} | ${(cand.title || '').slice(0, 40)}`)
      done = true; break
    }
    if (done) break
    await sleep(800)
  }
  if (!done) console.log(`${slot.name.padEnd(26)} <- still none`)
  await sleep(800)
}
appendFileSync(join(OUT, 'CREDITS.txt'), credits.join('\n') + '\n')
console.log('done')
