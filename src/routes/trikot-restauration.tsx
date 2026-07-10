import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/trikot-restauration')({
  beforeLoad: () => {
    throw redirect({ to: '/textile-printing/$slug', params: { slug: 'sportswear' }, statusCode: 301 })
  },
})
