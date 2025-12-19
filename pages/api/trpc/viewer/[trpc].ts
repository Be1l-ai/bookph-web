import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { loggedInViewerRouter } from "@bookph/core/trpc/server/routers/loggedInViewer/_router";

export default createNextApiHandler(loggedInViewerRouter);
