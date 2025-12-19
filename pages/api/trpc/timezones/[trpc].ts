import { createNextApiHandler } from "@bookph/core/trpc/server/createNextApiHandler";
import { timezonesRouter } from "@bookph/core/trpc/server/routers/publicViewer/timezones/_router";

export default createNextApiHandler(timezonesRouter, true);
