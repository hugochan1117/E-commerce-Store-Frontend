import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import OrderConfirmationPage from "../../ui/page/OrderConfirmationPage";

export const Route = createFileRoute('/OrderConfirmationPage/')({
  component: OrderConfirmationPage,
  validateSearch: z.object({ tid: z.coerce.number(),
  })
})
