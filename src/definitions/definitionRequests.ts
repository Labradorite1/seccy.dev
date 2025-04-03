import {
  AllDestinyManifestComponents,
  DestinyManifest,
  getDestinyManifest,
  getDestinyManifestSlice,
} from "bungie-api-ts/destiny2";
import { $apiKeyHttpClient, $definitionHttpClient } from "../httpClients/httpClientProvider";

async function FetchManifest() {
  const response = await getDestinyManifest($apiKeyHttpClient);
  return response.Response;
}

async function FetchDefinition(tableName: keyof AllDestinyManifestComponents, destinyManifest: DestinyManifest) {
  const response = await getDestinyManifestSlice($definitionHttpClient, {
    destinyManifest,
    tableNames: [tableName],
    language: "en",
  });

  return response[tableName];
}

export { FetchManifest, FetchDefinition };
