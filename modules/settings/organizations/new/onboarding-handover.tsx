"use client";

import { AdminOnboardingHandover } from "@bookph/core/features/ee/organizations/components";
import { WizardLayout } from "@bookph/ui/components/layout";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WizardLayout currentStep={2} maxSteps={2}>
      {children}
    </WizardLayout>
  );
};

export default AdminOnboardingHandover;
