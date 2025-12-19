import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { routingFormsRouter } from "@bookph/core/trpc/server/routers/viewer/routing-forms/_router";

export default createNextApiHandler(routingFormsRouter);
