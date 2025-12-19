import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { authRouter } from "@bookph/core/trpc/server/routers/viewer/auth/_router";

export default createNextApiHandler(authRouter);
