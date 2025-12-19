import { HttpError } from "@bookph/core/lib/http-error";
import logger from "@bookph/core/lib/logger";
import { safeStringify } from "@bookph/core/lib/safeStringify";
import { BookingReferenceRepository } from "@bookph/core/lib/server/repository/bookingReference";

const log = logger.getSubLogger({ prefix: ["daily-video-webhook-handler"] });

export const getBookingReference = async (roomName: string) => {
  const bookingReference = await BookingReferenceRepository.findDailyVideoReferenceByRoomName({ roomName });

  if (!bookingReference || !bookingReference.bookingId) {
    log.error(
      "bookingReference not found error:",
      safeStringify({
        bookingReference,
        roomName,
      })
    );

    throw new HttpError({ message: "Booking reference not found", statusCode: 200 });
  }

  return bookingReference;
};
