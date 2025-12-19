import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import { handler } from "@bookph/core/features/ee/workflows/api/scheduleWhatsappReminders";

export const POST = defaultResponderForAppDir(handler);
