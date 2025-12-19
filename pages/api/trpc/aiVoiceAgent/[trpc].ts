import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { aiVoiceAgentRouter } from "@bookph/core/trpc/server/routers/viewer/aiVoiceAgent/_router";

export default createNextApiHandler(aiVoiceAgentRouter);
