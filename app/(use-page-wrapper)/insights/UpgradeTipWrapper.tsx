"use client";

import { useSession } from "next-auth/react";

import { UpgradeTip } from "@bookph/core/features/tips";
import { WEBAPP_URL } from "@bookph/core/lib/constants";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Button } from "@bookph/ui/components/button";
import { ButtonGroup } from "@bookph/ui/components/buttonGroup";
import { Icon } from "@bookph/ui/components/icon";

export default function UpgradeTipWrapper({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();
  const session = useSession();
  const features = [
    {
      icon: <Icon name="users" className="h-5 w-5" />,
      title: t("view_bookings_across"),
      description: t("view_bookings_across_description"),
    },
    {
      icon: <Icon name="refresh-ccw" className="h-5 w-5" />,
      title: t("identify_booking_trends"),
      description: t("identify_booking_trends_description"),
    },
    {
      icon: <Icon name="user-plus" className="h-5 w-5" />,
      title: t("spot_popular_event_types"),
      description: t("spot_popular_event_types_description"),
    },
  ];

  return (
    <UpgradeTip
      plan="team"
      title={t("make_informed_decisions")}
      description={t("make_informed_decisions_description")}
      features={features}
      background="/tips/insights"
      buttons={
        <div className="stack-y-2 rtl:space-x-reverse sm:space-x-2">
          <ButtonGroup>
            <Button color="primary" href={`${WEBAPP_URL}/settings/teams/new`}>
              {t("create_team")}
            </Button>
            <Button color="minimal" href="https://go.cal.com/insights" target="_blank">
              {t("learn_more")}
            </Button>
          </ButtonGroup>
        </div>
      }>
      {!session.data?.user ? null : children}
    </UpgradeTip>
  );
}
