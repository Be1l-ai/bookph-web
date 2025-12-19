import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { ssoRouter } from "@bookph/core/trpc/server/routers/viewer/sso/_router";

export default createNextApiHandler(ssoRouter);
