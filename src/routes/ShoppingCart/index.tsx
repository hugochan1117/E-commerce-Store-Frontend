import { createFileRoute } from '@tanstack/react-router'
import ShoppingCartPage from "../../ui/page/ShoppingCartPage";

export const Route = createFileRoute('/ShoppingCart/')({
  component: ShoppingCartPage,
})


