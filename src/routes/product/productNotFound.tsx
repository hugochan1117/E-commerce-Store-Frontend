import { createFileRoute } from '@tanstack/react-router'
import ProductNotFoundPage from "../../ui/page/ProductDetailPage/components/ProductNotFoundPage.tsx";

export const Route = createFileRoute('/product/productNotFound')({
  component: ProductNotFoundPage,
})

