import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { phoneNumberRouter } from "@bookph/core/trpc/server/routers/viewer/phoneNumber/_router";

export default createNextApiHandler(phoneNumberRouter);
