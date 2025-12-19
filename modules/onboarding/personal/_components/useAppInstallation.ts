import { useState } from "react";

import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { trpc } from "@bookph/core/trpc/react";
import { showToast } from "@bookph/ui/components/toast";

type InstallSuccessCallback = (appSlug: string) => void;

export const useAppInstallation = () => {
  const { t } = useLocale();
  const utils = trpc.useUtils();
  const [installingAppSlug, setInstallingAppSlug] = useState<string | null>(null);

  const createInstallHandlers = (appSlug: string, onSuccess?: InstallSuccessCallback) => {
    return {
      onSuccess: () => {
        setInstallingAppSlug(null);
        utils.viewer.apps.integrations.invalidate();
        showToast(t("app_successfully_installed"), "success");

        // Call custom success callback if provided
        onSuccess?.(appSlug);
      },
      onError: (error: unknown) => {
        setInstallingAppSlug(null);
        if (error instanceof Error) {
          showToast(error.message || t("app_could_not_be_installed"), "error");
        }
      },
    };
  };

  return {
    installingAppSlug,
    setInstallingAppSlug,
    createInstallHandlers,
  };
};
