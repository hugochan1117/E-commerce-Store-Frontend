import { createFileRoute } from '@tanstack/react-router'
import ProductCategoryPage from "../../ui/page/ProductCategoryPage";

export const Route = createFileRoute('/product/category/$category')({
  component: ProductCategoryPage,
})


