import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { creditsRouter } from "@bookph/core/trpc/server/routers/viewer/credits/_router";

export default createNextApiHandler(creditsRouter);
