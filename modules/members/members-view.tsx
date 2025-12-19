"use client";

import { checkAdminOrOwner } from "@bookph/core/features/auth/lib/checkAdminOrOwner";
import LicenseRequired from "@bookph/core/features/ee/common/components/LicenseRequired";
import { UserListTable } from "@bookph/core/features/users/components/UserTable/UserListTable";
import type { UserListTableProps } from "@bookph/core/features/users/components/UserTable/UserListTable";
import type { MemberPermissions } from "@bookph/core/features/users/components/UserTable/types";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";

export const MembersView = (props: UserListTableProps & { permissions?: MemberPermissions }) => {
  const { t } = useLocale();
  const { permissions, ...tableProps } = props;

  // Use PBAC permissions if available, otherwise fall back to role-based check
  const isOrgAdminOrOwner = props.org && checkAdminOrOwner(props.org.user.role);
  const canLoggedInUserSeeMembers =
    permissions?.canListMembers ??
    ((props.org?.isPrivate && isOrgAdminOrOwner) || isOrgAdminOrOwner || !props.org?.isPrivate);

  return (
    <LicenseRequired>
      <div>{canLoggedInUserSeeMembers && <UserListTable {...tableProps} permissions={permissions} />}</div>
      {!canLoggedInUserSeeMembers && (
        <div className="border-subtle rounded-xl border p-6" data-testid="members-privacy-warning">
          <h2 className="text-default">{t("only_admin_can_see_members_of_org")}</h2>
        </div>
      )}
    </LicenseRequired>
  );
};
