import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { travelSchedulesRouter } from "@bookph/core/trpc/server/routers/viewer/travelSchedules/_router";

export default createNextApiHandler(travelSchedulesRouter);
