import { notFound } from "next/navigation";

import { FeaturesRepository } from "@bookph/core/features/flags/features.repository";
import { prisma } from "@bookph/core/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const featuresRepository = new FeaturesRepository(prisma);
  const organizations = await featuresRepository.checkIfFeatureIsEnabledGlobally("organizations");

  if (!organizations) {
    return notFound();
  }

  return children;
}
