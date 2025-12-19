import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { credentialsRouter } from "@bookph/core/trpc/server/routers/viewer/credentials/_router";

export default createNextApiHandler(credentialsRouter);
