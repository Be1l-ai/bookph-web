import { _generateMetadata } from "app/_utils";
import { getTranslate } from "app/_utils";

import SAMLSSO from "@bookph/core/features/ee/sso/page/user-sso-view";
import SettingsHeader from "@bookph/core/features/settings/appDir/SettingsHeader";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("sso_configuration"),
    (t) => t("sso_configuration_description"),
    undefined,
    undefined,
    "/settings/security/sso"
  );

const Page = async () => {
  const t = await getTranslate();

  return (
    <SettingsHeader
      title={t("sso_configuration")}
      description={t("sso_configuration_description")}
      borderInShellHeader={true}>
      <SAMLSSO />
    </SettingsHeader>
  );
};

export default Page;
