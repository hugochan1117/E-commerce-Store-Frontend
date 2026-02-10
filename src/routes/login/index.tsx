import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../../ui/page/LoginPage";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
  validateSearch: z.object({
    redirect: z.string().optional(),
    reason: z.string().optional(),
  }),
});


