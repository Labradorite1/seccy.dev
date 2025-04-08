import { BungieMembershipType, DestinyComponentType } from "bungie-api-ts/destiny2";
import {
  GetMembershipDataForCurrentUser,
  GetProfile,
  SearchDestinyPlayerByBungieName,
} from "../requests/bungieRequests";
import { GroupUserInfoCard, PlatformErrorCodes } from "bungie-api-ts/groupv2";
import { BUNGIE_PROFILE_LS, PRIMARY_PROFILE_LS, PROFILES_LS } from "../../data/globals";
import { ExactSearchRequest } from "bungie-api-ts/user";
import { GMReportSearchPlayer } from "../requests/gmReportRequest";

async function saveProfileToLocalStorage() {
  const profiles = await GetMembershipDataForCurrentUser();

  const primaryMembership = GetPrimaryMembership(profiles.Response.destinyMemberships);

  localStorage.setItem(BUNGIE_PROFILE_LS, JSON.stringify(profiles.Response.bungieNetUser));

  localStorage.setItem(PRIMARY_PROFILE_LS, JSON.stringify(primaryMembership));

  localStorage.setItem(PROFILES_LS, JSON.stringify(profiles.Response.destinyMemberships));
}

function setPrimaryMembership(newPrimaryMembership: GroupUserInfoCard) {
  if (!newPrimaryMembership) return;

  localStorage.setItem(PRIMARY_PROFILE_LS, JSON.stringify(newPrimaryMembership));
}

function getPrimaryMembership(): GroupUserInfoCard | undefined {
  const primary_profile = localStorage.getItem(PRIMARY_PROFILE_LS);
  if (!primary_profile) return undefined;

  return JSON.parse(primary_profile!);
}

function getAllMemberships(): GroupUserInfoCard[] | undefined {
  const memberships = localStorage.getItem(PROFILES_LS);
  if (!memberships) return undefined;

  return JSON.parse(memberships);
}

function GetPrimaryMembership(profiles: GroupUserInfoCard[]) {
  if (profiles.some((x) => x.crossSaveOverride !== BungieMembershipType.None)) {
    return profiles.find((x) => x.membershipType === x.crossSaveOverride);
  }

  return profiles[0];
}

function deleteProfileFromLocalStorage() {
  localStorage.removeItem(PRIMARY_PROFILE_LS);
  localStorage.removeItem(BUNGIE_PROFILE_LS);
  localStorage.removeItem(PROFILES_LS);
}

async function searchForProfileByBungieName(bungieName: ExactSearchRequest) {
  const searchByBungieName = await SearchDestinyPlayerByBungieName(
    {
      membershipType: BungieMembershipType.All,
    },
    bungieName
  );

  if ((searchByBungieName?.Response?.length ?? 0) > 0) {
    return searchByBungieName.Response.find(
      (x) => x.crossSaveOverride === 0 || x.membershipType === x.crossSaveOverride
    )!;
  }

  const gmReportSearch = await GMReportSearchPlayer(
    `${bungieName.displayName}#${String(bungieName.displayNameCode).padStart(4, "0")}`
  );

  if (gmReportSearch.result.results?.length ?? 0 > 0) {
    var profiles = await Promise.all(
      [
        BungieMembershipType.TigerXbox,
        BungieMembershipType.TigerPsn,
        BungieMembershipType.TigerSteam,
        BungieMembershipType.TigerStadia,
        BungieMembershipType.TigerEgs,
      ].map((membershipType) =>
        GetProfile({
          membershipType,
          destinyMembershipId: gmReportSearch.result.results![0].id,
          components: [DestinyComponentType.Profiles],
        })
      )
    );

    if (profiles.some((x) => x.ErrorCode === PlatformErrorCodes.Success)) {
      return profiles.find((x) => x.ErrorCode === PlatformErrorCodes.Success)!.Response.profile.data!.userInfo;
    }
  }
}

export {
  saveProfileToLocalStorage,
  deleteProfileFromLocalStorage,
  getPrimaryMembership,
  getAllMemberships,
  setPrimaryMembership,
  searchForProfileByBungieName,
};
