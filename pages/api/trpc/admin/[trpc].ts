import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { adminRouter } from "@bookph/core/trpc/server/routers/viewer/admin/_router";

export default createNextApiHandler(adminRouter);
