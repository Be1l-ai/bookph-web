import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { bookingsRouter } from "@bookph/core/trpc/server/routers/viewer/bookings/_router";

export default createNextApiHandler(bookingsRouter);
