import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/sportswear')({
  beforeLoad: () => {
    throw redirect({ to: '/textile-printing/$slug', params: { slug: 'sportswear' } })
  },
})
