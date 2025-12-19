"use client";

import { ShellMainAppDir } from "app/(use-page-wrapper)/(main-nav)/ShellMainAppDir";

import SkeletonLoader from "@bookph/core/features/availability/components/SkeletonLoader";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";

import { AvailabilityCTA } from "~/availability/availability-view";

export default function AvailabilityLoader() {
  const { t } = useLocale();

  return (
    <ShellMainAppDir
      heading={t("availability")}
      subtitle={t("configure_availability")}
      CTA={<AvailabilityCTA canViewTeamAvailability />}>
      <SkeletonLoader />
    </ShellMainAppDir>
  );
}
