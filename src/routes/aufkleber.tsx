import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/aufkleber')({
  beforeLoad: () => {
    throw redirect({ to: '/promotional-products' })
  },
})
