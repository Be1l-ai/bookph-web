import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { calendarsRouter } from "@bookph/core/trpc/server/routers/viewer/calendars/_router";

export default createNextApiHandler(calendarsRouter);
