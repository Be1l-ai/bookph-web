"use client";

import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Alert } from "@bookph/ui/components/alert";

export default function Error() {
  const { t } = useLocale();
  return <Alert severity="error" title={t("something_went_wrong")} />;
}
