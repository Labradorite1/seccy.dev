import { BungieMembershipType } from "bungie-api-ts/destiny2";

export default function getMembershipName(bungieMembershipType: BungieMembershipType) {
  switch (bungieMembershipType) {
    case BungieMembershipType.All:
      return "All";
    case BungieMembershipType.None:
      return "None";
    case BungieMembershipType.TigerXbox:
      return "Xbox";
    case BungieMembershipType.TigerPsn:
      return "Playstation";
    case BungieMembershipType.TigerSteam:
      return "Steam";
    case BungieMembershipType.TigerBlizzard:
      return "Blizzard";
    case BungieMembershipType.TigerStadia:
      return "Stadia";
    case BungieMembershipType.TigerEgs:
      return "Epic Games";
    case BungieMembershipType.BungieNext:
      return "Bungie.net";
    default:
      return "None";
  }
}
