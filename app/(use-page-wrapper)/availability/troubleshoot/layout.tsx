"use client";

import React, { Suspense } from "react";

import { ErrorBoundary } from "@bookph/ui/components/errorBoundary";
import { Icon } from "@bookph/ui/components/icon";

export default function TroubleshooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-1 *:flex-1">
        <ErrorBoundary>
          <Suspense fallback={<Icon name="loader" />}>{children}</Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
