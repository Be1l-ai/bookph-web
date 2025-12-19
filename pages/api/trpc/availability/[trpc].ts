import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { availabilityRouter } from "@bookph/core/trpc/server/routers/viewer/availability/_router";

export default createNextApiHandler(availabilityRouter);
