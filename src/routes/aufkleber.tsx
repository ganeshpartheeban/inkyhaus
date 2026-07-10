import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/aufkleber')({
  beforeLoad: () => {
    throw redirect({ to: '/printing-methods/$slug', params: { slug: 'sticker-vinyl' } })
  },
})
