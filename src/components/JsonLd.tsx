// Renders one or more JSON-LD blocks. SSR-safe (plain script tags).
import type { JsonLd as JsonLdType } from '../lib/seo'

export function JsonLd({ data }: { data: JsonLdType | JsonLdType[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema objects are author-controlled, not user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}
