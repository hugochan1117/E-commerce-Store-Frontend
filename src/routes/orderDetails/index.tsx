import { createFileRoute } from "@tanstack/react-router";
import OrderDetailsPage from "../../ui/page/order-details";

export const Route = createFileRoute("/orderDetails/")({
  component: OrderDetailsPage,
  validateSearch: (search) => {
    return {
      tid: Number(search.tid),
    };
  },
});
