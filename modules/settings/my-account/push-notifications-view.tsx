"use client";

import { useWebPush } from "@bookph/core/features/notifications/WebPushContext";
import SettingsHeader from "@bookph/core/features/settings/appDir/SettingsHeader";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Button } from "@bookph/ui/components/button";

const PushNotificationsView = () => {
  const { t } = useLocale();
  const { subscribe, unsubscribe, isSubscribed, isLoading } = useWebPush();

  return (
    <SettingsHeader
      title={t("push_notifications")}
      description={t("push_notifications_description")}
      borderInShellHeader={true}>
      <div className="border-subtle rounded-b-xl border-x border-b px-4 pb-10 pt-8 sm:px-6">
        <Button color="primary" onClick={isSubscribed ? unsubscribe : subscribe} disabled={isLoading}>
          {isSubscribed ? t("disable_browser_notifications") : t("allow_browser_notifications")}
        </Button>
      </div>
    </SettingsHeader>
  );
};

export default PushNotificationsView;
