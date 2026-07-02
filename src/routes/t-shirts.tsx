import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/t-shirts')({
  beforeLoad: () => {
    throw redirect({ to: '/textile-printing/$slug', params: { slug: 't-shirts' } })
  },
})
