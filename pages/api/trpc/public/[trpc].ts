import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { publicViewerRouter } from "@bookph/core/trpc/server/routers/publicViewer/_router";

export default createNextApiHandler(publicViewerRouter, true);
