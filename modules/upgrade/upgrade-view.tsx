"use client";

import { useRouter } from "next/navigation";

import Shell from "@bookph/core/features/shell/Shell";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import type { RouterOutputs } from "@bookph/core/trpc/react";
import { trpc } from "@bookph/core/trpc/react";
import { Button } from "@bookph/ui/components/button";
import { EmptyScreen } from "@bookph/ui/components/empty-screen";
import { showToast } from "@bookph/ui/components/toast";

export type OrgUpgradeBannerProps = {
  data: RouterOutputs["viewer"]["me"]["getUserTopBanners"]["orgUpgradeBanner"];
};

export default function UpgradePage() {
  const { t } = useLocale();

  const router = useRouter();
  const publishOrgMutation = trpc.viewer.organizations.publish.useMutation({
    onSuccess(data) {
      router.push(data.url);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const doesUserHaveOrgToUpgrade = trpc.viewer.organizations.checkIfOrgNeedsUpgrade.useQuery();

  return (
    <Shell>
      <div className="max-w-(--breakpoint-lg)">
        {doesUserHaveOrgToUpgrade.data ? (
          <EmptyScreen
            headline={t("your_upgrade_is_here")}
            description={t("your_upgrade_is_here_description")}
            Icon="circle-arrow-up"
            buttonRaw={
              <Button
                onClick={() => {
                  publishOrgMutation.mutate();
                }}>
                {t("upgrade")}
              </Button>
            }
          />
        ) : (
          <EmptyScreen
            headline={t("you_are_all_set")}
            description={t("you_are_all_set_description")}
            Icon="circle-check"
            buttonRaw={<Button href="mailto:support@cal.com">{t("contact_support")}</Button>}
          />
        )}
      </div>
    </Shell>
  );
}
