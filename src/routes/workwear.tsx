import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/workwear')({
  beforeLoad: () => {
    throw redirect({ to: '/textile-printing/$slug', params: { slug: 'workwear' }, statusCode: 301 })
  },
})
