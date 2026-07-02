import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/pokale-medaillen')({
  beforeLoad: () => {
    throw redirect({ to: '/promotional-products/$slug', params: { slug: 'awards' } })
  },
})
