import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { meRouter } from "@bookph/core/trpc/server/routers/viewer/me/_router";

export default createNextApiHandler(meRouter);
