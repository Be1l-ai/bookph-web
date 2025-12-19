import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

import { getServerSession } from "@bookph/core/features/auth/lib/getServerSession";
import { getMultipleDurationValue } from "@bookph/core/features/bookings/lib/get-booking";
import { getSlugOrRequestedSlug } from "@bookph/core/features/ee/organizations/lib/orgDomains";
import { orgDomainConfig } from "@bookph/core/features/ee/organizations/lib/orgDomains";
import { EventRepository } from "@bookph/core/features/eventtypes/repositories/EventRepository";
import { shouldHideBrandingForTeamEvent } from "@bookph/core/features/profile/lib/hideBranding";
import slugify from "@bookph/core/lib/slugify";
import prisma from "@bookph/core/prisma";

const paramsSchema = z.object({
  type: z.string().transform((s) => slugify(s)),
  slug: z.string().transform((s) => slugify(s)),
});

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { slug: teamSlug, type: meetingSlug } = paramsSchema.parse(context.params);
  const { duration: queryDuration } = context.query;

  const { currentOrgDomain, isValidOrgDomain } = orgDomainConfig(context.req, context.params?.orgSlug);

  const team = await prisma.team.findFirst({
    where: {
      ...getSlugOrRequestedSlug(teamSlug),
      parent: isValidOrgDomain && currentOrgDomain ? getSlugOrRequestedSlug(currentOrgDomain) : null,
    },
    select: {
      id: true,
      isPrivate: true,
      hideBranding: true,
      parent: {
        select: {
          hideBranding: true,
        },
      },
    },
  });

  if (!team) {
    return {
      notFound: true,
    } as const;
  }

  const org = isValidOrgDomain ? currentOrgDomain : null;
  if (!org) {
    return {
      notFound: true,
    } as const;
  }
  const session = await getServerSession({ req: context.req });
  const eventData = await EventRepository.getPublicEvent(
    {
      username: teamSlug,
      eventSlug: meetingSlug,
      isTeamEvent: true,
      org,
      fromRedirectOfNonOrgLink: context.query.orgRedirection === "true",
    },
    session?.user?.id
  );

  if (!eventData) {
    return {
      notFound: true,
    } as const;
  }

  return {
    props: {
      eventData,
      entity: eventData.entity,
      eventTypeId: eventData.id,
      duration: getMultipleDurationValue(
        eventData.metadata?.multipleDuration,
        queryDuration,
        eventData.length
      ),
      booking: null,
      user: teamSlug,
      teamId: team.id,
      slug: meetingSlug,
      isBrandingHidden: shouldHideBrandingForTeamEvent({
        eventTypeId: eventData.id,
        team,
      }),
      themeBasis: null,
      teamIsPrivate: team.isPrivate,
    },
  };
};
