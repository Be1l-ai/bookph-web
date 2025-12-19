import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import { handler } from "@bookph/core/features/ee/workflows/api/scheduleEmailReminders";

export const POST = defaultResponderForAppDir(handler);
