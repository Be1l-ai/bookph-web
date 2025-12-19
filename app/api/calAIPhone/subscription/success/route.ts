import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import handler from "@bookph/core/features/calAIPhone/phoneNumberSubscriptionWebhook";

export const GET = defaultResponderForAppDir(handler);
