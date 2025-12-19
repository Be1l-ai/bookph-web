import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { workflowsRouter } from "@bookph/core/trpc/server/routers/viewer/workflows/_router";

export default createNextApiHandler(workflowsRouter);
