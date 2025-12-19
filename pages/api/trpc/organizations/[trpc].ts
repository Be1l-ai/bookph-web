import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { viewerOrganizationsRouter } from "@bookph/core/trpc/server/routers/viewer/organizations/_router";

export default createNextApiHandler(viewerOrganizationsRouter);
