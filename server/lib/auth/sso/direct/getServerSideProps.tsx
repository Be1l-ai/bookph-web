import { samlProductID, samlTenantID } from "@bookph/core/features/ee/sso/lib/saml";

export async function getServerSideProps() {
  return {
    props: {
      samlTenantID,
      samlProductID,
    },
  };
}
