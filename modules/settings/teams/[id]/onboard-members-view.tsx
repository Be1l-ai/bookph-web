"use client";

import AddNewTeamMembers from "@bookph/core/features/ee/teams/components/AddNewTeamMembers";
import { WizardLayout } from "@bookph/ui/components/layout";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <WizardLayout currentStep={2} maxSteps={3}>
    {children}
  </WizardLayout>
);

export default AddNewTeamMembers;
