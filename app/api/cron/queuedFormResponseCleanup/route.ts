import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import { handleQueuedFormResponseCleanup } from "@bookph/core/app-store/routing-forms/cron/queuedFormResponseCleanup";

export const GET = defaultResponderForAppDir(handleQueuedFormResponseCleanup);
