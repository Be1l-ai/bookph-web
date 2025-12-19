import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { attributesRouter } from "@bookph/core/trpc/server/routers/viewer/attributes/_router";

export default createNextApiHandler(attributesRouter);
