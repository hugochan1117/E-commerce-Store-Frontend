import { createFileRoute } from '@tanstack/react-router'
import OrderHistoryPage from "../../ui/page/OrderHistoryPage";

export const Route = createFileRoute('/OrderHistory/')({
  component: OrderHistoryPage,
})


