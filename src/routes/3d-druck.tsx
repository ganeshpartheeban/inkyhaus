import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/3d-druck')({
  beforeLoad: () => {
    throw redirect({ to: '/promotional-products' })
  },
})
