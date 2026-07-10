import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/hoodies')({
  beforeLoad: () => {
    throw redirect({ to: '/textile-printing/$slug', params: { slug: 'hoodies' }, statusCode: 301 })
  },
})
