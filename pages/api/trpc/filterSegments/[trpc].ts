import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { filterSegmentsRouter } from "@bookph/core/trpc/server/routers/viewer/filterSegments/_router";

export default createNextApiHandler(filterSegmentsRouter);
