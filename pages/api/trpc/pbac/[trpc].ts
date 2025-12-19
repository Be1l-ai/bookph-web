import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { permissionsRouter } from "@bookph/core/trpc/server/routers/viewer/pbac/_router";

export default createNextApiHandler(permissionsRouter);
