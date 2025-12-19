import { useEffect, type FC } from "react";

import { EventTypeAppSettings } from "@bookph/core/app-store/_components/EventTypeAppSettingsInterface";
import type { EventTypeAppsList } from "@bookph/core/app-store/utils";
import useAppsData from "@bookph/core/features/apps/hooks/useAppsData";

import type { ConfigureStepCardProps } from "@components/apps/installation/ConfigureStepCard";

import type { TEventType } from "~/apps/installation/[[...step]]/step-view";

type EventTypeAppSettingsWrapperProps = Pick<
  ConfigureStepCardProps,
  "slug" | "userName" | "categories" | "credentialId"
> & {
  eventType: TEventType;
};

const EventTypeAppSettingsWrapper: FC<EventTypeAppSettingsWrapperProps> = ({
  slug,
  eventType,
  categories,
  credentialId,
}) => {
  const { getAppDataGetter, getAppDataSetter } = useAppsData();

  useEffect(() => {
    const appDataSetter = getAppDataSetter(slug as EventTypeAppsList, categories, credentialId);
    appDataSetter("enabled", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EventTypeAppSettings
      slug={slug}
      eventType={eventType}
      getAppData={getAppDataGetter(slug as EventTypeAppsList)}
      setAppData={getAppDataSetter(slug as EventTypeAppsList, categories, credentialId)}
    />
  );
};
export default EventTypeAppSettingsWrapper;
