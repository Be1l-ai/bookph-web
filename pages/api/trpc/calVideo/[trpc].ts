import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { calVideoRouter } from "@bookph/core/trpc/server/routers/viewer/calVideo/_router";

export default createNextApiHandler(calVideoRouter);
