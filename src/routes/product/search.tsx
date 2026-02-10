import { createFileRoute } from '@tanstack/react-router'
import SearchPage from "../../ui/page/SearchPage";

export const Route = createFileRoute('/product/search')({
  validateSearch: (search: { q?: string }) => search,
  component: SearchPage,
})


