import type { NextApiRequest } from "next";

import { getServerSession } from "@bookph/core/features/auth/lib/getServerSession";
import { getInstantBookingCreateService } from "@bookph/core/features/bookings/di/InstantBookingCreateService.container";
import { checkRateLimitAndThrowError } from "@bookph/core/lib/checkRateLimitAndThrowError";
import getIP from "@bookph/core/lib/getIP";
import { piiHasher } from "@bookph/core/lib/server/PiiHasher";
import { defaultResponder } from "@bookph/core/lib/server/defaultResponder";
import { CreationSource } from "@bookph/core/prisma/enums";

async function handler(req: NextApiRequest & { userId?: number }) {
  const userIp = getIP(req);

  await checkRateLimitAndThrowError({
    rateLimitingType: "instantMeeting",
    identifier: `instant.event-${piiHasher.hash(userIp)}`,
  });

  const session = await getServerSession({ req });
  req.userId = session?.user?.id || -1;
  req.body.creationSource = CreationSource.WEBAPP;

  const instantBookingService = getInstantBookingCreateService();
  // Even though req.body is any type, createBooking validates the schema on run-time.
  // TODO: We should do the run-time schema validation here and pass a typed bookingData instead and then run-time schema could be removed from createBooking. Then we can remove the any type from req.body.
  const booking = await instantBookingService.createBooking({
    bookingData: req.body,
  });

  return booking;
}
export default defaultResponder(handler);
