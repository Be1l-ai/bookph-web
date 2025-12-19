"use server";

import { revalidateTag } from "next/cache";

import { NEXTJS_CACHE_TTL } from "@bookph/core/lib/constants";
import { TravelScheduleRepository } from "@bookph/core/lib/server/repository/travelSchedule";
import { unstable_cache } from "@bookph/core/lib/unstable_cache";

const CACHE_TAGS = {
  TRAVEL_SCHEDULES: "TravelRepository.findTravelSchedulesByUserId",
} as const;

export const getTravelSchedule = unstable_cache(
  async (userId: number) => {
    return await TravelScheduleRepository.findTravelSchedulesByUserId(userId);
  },
  ["getTravelSchedule"],
  {
    revalidate: NEXTJS_CACHE_TTL,
    tags: [CACHE_TAGS.TRAVEL_SCHEDULES],
  }
);

export const revalidateTravelSchedules = async () => {
  revalidateTag(CACHE_TAGS.TRAVEL_SCHEDULES);
};
