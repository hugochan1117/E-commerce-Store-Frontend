import { createFileRoute } from '@tanstack/react-router'
import CheckOutPage from "../../ui/page/CheckOutPage";

export const Route = createFileRoute('/CheckOutPage/$tid')({
  component: CheckOutPage,
})

