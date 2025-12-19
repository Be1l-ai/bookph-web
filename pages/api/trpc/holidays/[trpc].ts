import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { holidaysRouter } from "@bookph/core/trpc/server/routers/viewer/holidays/_router";

export default createNextApiHandler(holidaysRouter);
