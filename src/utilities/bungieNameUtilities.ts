import { GroupUserInfoCard } from "bungie-api-ts/groupv2";
import { ExactSearchRequest, UserInfoCard } from "bungie-api-ts/user";

function getBungieNameFromInfoCard(userCard: GroupUserInfoCard | UserInfoCard) {
  if (userCard.bungieGlobalDisplayName.trim().length === 0) return userCard.displayName;

  return `${userCard.bungieGlobalDisplayName}#${String(userCard.bungieGlobalDisplayNameCode).padStart(4, "0")}`;
}

function getValidBungieNameFromString(input: string): ExactSearchRequest | undefined {
  if (!input.includes("#")) return;
  const splitInput = input.split("#");

  const lastInput = splitInput.pop();
  if (!lastInput) return;

  if (lastInput.length != 4) return;

  if (isNaN(+lastInput)) return;

  return {
    displayName: splitInput.join("#").trim(),
    displayNameCode: +lastInput,
  };
}

export { getBungieNameFromInfoCard, getValidBungieNameFromString };
