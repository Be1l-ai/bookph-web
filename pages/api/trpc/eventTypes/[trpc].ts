import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { eventTypesRouter } from "@bookph/core/trpc/server/routers/viewer/eventTypes/_router";

export default createNextApiHandler(eventTypesRouter);
