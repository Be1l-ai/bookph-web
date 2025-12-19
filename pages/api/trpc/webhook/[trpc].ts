import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { webhookRouter } from "@bookph/core/trpc/server/routers/viewer/webhook/_router";

export default createNextApiHandler(webhookRouter);
