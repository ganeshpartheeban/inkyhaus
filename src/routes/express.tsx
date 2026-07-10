import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/express')({
  beforeLoad: () => {
    throw redirect({ to: '/contact', hash: 'booking-enquiry', statusCode: 301 })
  },
})
