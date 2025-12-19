import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { apiKeysRouter } from "@bookph/core/trpc/server/routers/viewer/apiKeys/_router";

export default createNextApiHandler(apiKeysRouter);
