import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { deploymentSetupRouter } from "@bookph/core/trpc/server/routers/viewer/deploymentSetup/_router";

export default createNextApiHandler(deploymentSetupRouter);
