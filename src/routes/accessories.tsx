import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/accessories')({
  beforeLoad: () => {
    throw redirect({ to: '/textile-printing', statusCode: 301 })
  },
})
