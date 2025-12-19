import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { appsRouter } from "@bookph/core/trpc/server/routers/viewer/apps/_router";

export default createNextApiHandler(appsRouter);
