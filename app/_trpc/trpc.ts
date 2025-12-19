"use client";

import type { AppRouter } from "@bookph/core/trpc/types/server/routers/_app";

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({});
