"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

import { APP_NAME } from "@bookph/core/lib/constants";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { trpc } from "@bookph/core/trpc";
import useEmailVerifyCheck from "@bookph/core/trpc/react/hooks/useEmailVerifyCheck";
import { showToast } from "@bookph/ui/components/toast";
import { Button } from "@bookph/ui/components/button";
import { EmptyScreen } from "@bookph/ui/components/empty-screen";
import { useFlagMap } from "@bookph/core/features/flags/context/provider";

function VerifyEmailPage() {
  const { data } = useEmailVerifyCheck();
  const { data: session } = useSession();
  const router = useRouter();
  const { t, isLocaleReady } = useLocale();
  const mutation = trpc.viewer.auth.resendVerifyEmail.useMutation();
  const flags = useFlagMap();

  useEffect(() => {
    if (data?.isVerified) {
      posthog.capture("verify_email_already_verified", {
        onboarding_v3_enabled: flags["onboarding-v3"],
      });
      const gettingStartedPath = flags["onboarding-v3"] ? "/onboarding/getting-started" : "/getting-started";
      router.replace(gettingStartedPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.isVerified, flags]);
  if (!isLocaleReady) {
    return null;
  }
  return (
    <div className="h-screen w-full ">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="max-w-3xl">
          <EmptyScreen
            border
            dashedBorder={false}
            Icon="mail-open"
            headline={t("check_your_email")}
            description={t("verify_email_page_body", { email: session?.user?.email, appName: APP_NAME })}
            className="bg-default"
            buttonRaw={
              <Button
                color="minimal"
                className="underline"
                loading={mutation.isPending}
                onClick={() => {
                  posthog.capture("verify_email_resend_clicked");
                  showToast(t("send_email"), "success");
                  mutation.mutate();
                }}>
                {t("resend_email")}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
