import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { dsyncRouter } from "@bookph/core/trpc/server/routers/viewer/dsync/_router";

export default createNextApiHandler(dsyncRouter);
