import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { delegationCredentialRouter } from "@bookph/core/trpc/server/routers/viewer/delegationCredential/_router";

export default createNextApiHandler(delegationCredentialRouter);
