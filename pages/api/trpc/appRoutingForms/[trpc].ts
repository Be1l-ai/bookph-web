import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import appRoutingForms from "@bookph/core/trpc/server/routers/apps/routing-forms/_router";

export default createNextApiHandler(appRoutingForms);
