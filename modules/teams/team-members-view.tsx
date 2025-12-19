"use client";

import { useState } from "react";

import LicenseRequired from "@bookph/core/features/ee/common/components/LicenseRequired";
import { MemberInvitationModalWithoutMembers } from "@bookph/core/features/ee/teams/components/MemberInvitationModal";
import MemberList from "@bookph/core/features/ee/teams/components/MemberList";
import type { MemberPermissions } from "@bookph/core/features/users/components/UserTable/types";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import type { RouterOutputs } from "@bookph/core/trpc/react";

interface TeamMembersViewProps {
  team: NonNullable<RouterOutputs["viewer"]["teams"]["get"]>;
  facetedTeamValues?: {
    roles: { id: string; name: string }[];
    teams: RouterOutputs["viewer"]["teams"]["get"][];
    attributes: {
      id: string;
      name: string;
      options: {
        value: string;
      }[];
    }[];
  };
  attributes?: {
    id: string;
    name: string;
    options: {
      value: string;
    }[];
  }[];
  permissions: MemberPermissions;
}

export const TeamMembersView = ({ team, facetedTeamValues, permissions }: TeamMembersViewProps) => {
  const { t } = useLocale();
  const [showMemberInvitationModal, setShowMemberInvitationModal] = useState(false);
  const [_showInviteLinkSettingsModal, setShowInviteLinkSettingsModal] = useState(false);

  // Use PBAC permissions - server-side permission check should be done in parent component
  const canLoggedInUserSeeMembers = permissions?.canListMembers ?? false;

  return (
    <LicenseRequired>
      <div>
        {canLoggedInUserSeeMembers && (
          <div className="mb-6">
            <MemberList
              team={team}
              isOrgAdminOrOwner={false}
              setShowMemberInvitationModal={setShowMemberInvitationModal}
              facetedTeamValues={facetedTeamValues}
              permissions={permissions}
            />
          </div>
        )}
        {!canLoggedInUserSeeMembers && (
          <div className="border-subtle rounded-xl border p-6" data-testid="members-privacy-warning">
            <h2 className="text-default">{t("only_admin_can_see_members_of_team")}</h2>
          </div>
        )}
        {showMemberInvitationModal && team && team.id && (
          <MemberInvitationModalWithoutMembers
            hideInvitationModal={() => setShowMemberInvitationModal(false)}
            showMemberInvitationModal={showMemberInvitationModal}
            teamId={team.id}
            token={team.inviteToken?.token}
            onSettingsOpen={() => setShowInviteLinkSettingsModal(true)}
          />
        )}
      </div>
    </LicenseRequired>
  );
};
