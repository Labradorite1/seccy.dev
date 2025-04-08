import { ExactSearchRequest, getMembershipDataForCurrentUser } from "bungie-api-ts/user";
import { $apiKeyHttpClient, $authorizedHttpClient } from "../httpClients/httpClientProvider";
import {
  getProfile,
  GetProfileParams,
  searchDestinyPlayerByBungieName,
  SearchDestinyPlayerByBungieNameParams,
} from "bungie-api-ts/destiny2";

export async function GetMembershipDataForCurrentUser() {
  return await getMembershipDataForCurrentUser($authorizedHttpClient);
}

export async function SearchDestinyPlayerByBungieName(
  searchDestinyPlayerByBungieNameParams: SearchDestinyPlayerByBungieNameParams,
  exactSearchRequest: ExactSearchRequest
) {
  return await searchDestinyPlayerByBungieName(
    $apiKeyHttpClient,
    searchDestinyPlayerByBungieNameParams,
    exactSearchRequest
  );
}

export async function GetProfileWithAuthentication(getProfileParams: GetProfileParams) {
  return await getProfile($authorizedHttpClient, getProfileParams);
}

export async function GetProfile(getProfileParams: GetProfileParams) {
  return await getProfile($apiKeyHttpClient, getProfileParams);
}
