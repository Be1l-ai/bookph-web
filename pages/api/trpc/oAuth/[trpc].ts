import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { oAuthRouter } from "@bookph/core/trpc/server/routers/viewer/oAuth/_router";

export default createNextApiHandler(oAuthRouter);
