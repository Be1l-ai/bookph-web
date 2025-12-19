import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { userAdminRouter } from "@bookph/core/trpc/server/routers/viewer/users/_router";

export default createNextApiHandler(userAdminRouter);
