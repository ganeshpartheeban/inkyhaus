import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/3d-druck')({
  beforeLoad: () => {
    throw redirect({ to: '/printing-methods/$slug', params: { slug: '3d-printing' }, statusCode: 301 })
  },
})
