import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { oooRouter } from "@bookph/core/trpc/server/routers/viewer/ooo/_router";

export default createNextApiHandler(oooRouter);
