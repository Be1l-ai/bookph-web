import { insightsRouter } from "@bookph/core/trpc/server/routers/viewer/insights/_router";
import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";

export default createNextApiHandler(insightsRouter);
