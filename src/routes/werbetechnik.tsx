import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/werbetechnik')({
  beforeLoad: () => {
    throw redirect({ to: '/promotional-products' })
  },
})
