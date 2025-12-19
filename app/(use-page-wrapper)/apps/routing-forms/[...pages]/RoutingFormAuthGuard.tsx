"use client";

import { useRedirectToLoginIfUnauthenticated } from "@bookph/core/features/auth/lib/hooks/useRedirectToLoginIfUnauthenticated";

export function RoutingFormAuthGuard({ children }: { children: React.ReactNode }) {
  useRedirectToLoginIfUnauthenticated();

  return <>{children}</>;
}
