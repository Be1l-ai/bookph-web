import dynamic from "next/dynamic";

import { DynamicComponent } from "@bookph/core/app-store/_components/DynamicComponent";

export const AppSetupMap = {
  alby: dynamic(() => import("~/components/apps/alby/Setup")),
  "apple-calendar": dynamic(
    () => import("~/components/apps/applecalendar/Setup")
  ),
  exchange: dynamic(() => import("~/components/apps/exchangecalendar/Setup")),
  "exchange2013-calendar": dynamic(
    () => import("~/components/apps/exchange2013calendar/Setup")
  ),
  "exchange2016-calendar": dynamic(
    () => import("~/components/apps/exchange2016calendar/Setup")
  ),
  "caldav-calendar": dynamic(
    () => import("~/components/apps/caldavcalendar/Setup")
  ),
  "ics-feed": dynamic(() => import("~/components/apps/ics-feedcalendar/Setup")),
  make: dynamic(() => import("~/components/apps/make/Setup")),
  sendgrid: dynamic(() => import("~/components/apps/sendgrid/Setup")),
  stripe: dynamic(() => import("~/components/apps/stripepayment/Setup")),
  paypal: dynamic(() => import("~/components/apps/paypal/Setup")),
  hitpay: dynamic(() => import("~/components/apps/hitpay/Setup")),
  btcpayserver: dynamic(() => import("~/components/apps/btcpayserver/Setup")),
};

export const AppSetupPage = (props: { slug: string }) => {
  return (
    <DynamicComponent<typeof AppSetupMap>
      componentMap={AppSetupMap}
      {...props}
    />
  );
};

export default AppSetupPage;
