import type z from "zod";

import type { bookingCancelSchema } from "@bookph/core/prisma/zod-utils";

export function getMockRequestDataForCancelBooking(data: z.infer<typeof bookingCancelSchema>) {
  return data;
}
