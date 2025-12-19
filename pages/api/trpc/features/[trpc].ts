import { featureFlagRouter } from "@bookph/core/features/flags/server/router";
import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";

export default createNextApiHandler(featureFlagRouter, true, "features");
