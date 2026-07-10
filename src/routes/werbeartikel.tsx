import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/werbeartikel')({
  beforeLoad: () => {
    throw redirect({ to: '/promotional-products', statusCode: 301 })
  },
})
