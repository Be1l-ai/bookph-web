import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { paymentsRouter } from "@bookph/core/trpc/server/routers/viewer/payments/_router";

export default createNextApiHandler(paymentsRouter);
