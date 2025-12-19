import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { googleWorkspaceRouter } from "@bookph/core/trpc/server/routers/viewer/googleWorkspace/_router";

export default createNextApiHandler(googleWorkspaceRouter);
