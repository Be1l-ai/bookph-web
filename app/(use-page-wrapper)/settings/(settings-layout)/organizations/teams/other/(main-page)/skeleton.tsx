"use client";

import SkeletonLoaderTeamList from "@bookph/core/features/ee/teams/components/SkeletonloaderTeamList";
import SettingsHeader from "@bookph/core/features/settings/appDir/SettingsHeader";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";

export function SkeletonLoader() {
  const { t } = useLocale();
  return (
    <SettingsHeader title={t("org_admin_other_teams")} description={t("org_admin_other_teams_description")}>
      <SkeletonLoaderTeamList />
    </SettingsHeader>
  );
}
