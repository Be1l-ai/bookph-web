import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { slotsRouter } from "@bookph/core/trpc/server/routers/viewer/slots/_router";

export default createNextApiHandler(slotsRouter);
