import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/lasergravur')({
  beforeLoad: () => {
    throw redirect({ to: '/printing-methods/$slug', params: { slug: 'laser-engraving' }, statusCode: 301 })
  },
})
