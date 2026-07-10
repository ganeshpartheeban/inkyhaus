import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/print-techniques')({
  beforeLoad: () => {
    throw redirect({ to: '/printing-methods', statusCode: 301 })
  },
})
