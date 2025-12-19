import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { viewerTeamsRouter } from "@bookph/core/trpc/server/routers/viewer/teams/_router";

export default createNextApiHandler(viewerTeamsRouter);
