import { DestinyManifest, DestinyManifestComponentName, DestinyManifestSlice } from "bungie-api-ts/destiny2";
import { get, set } from "idb-keyval";

import { requiredDefinitions } from "../../data/requiredDefinitions.ts";
import { FetchDefinition, FetchManifest } from "./definitionRequests.ts";

export type ManifestSlices = DestinyManifestSlice<Array<(typeof requiredDefinitions)[number]>>;

let allDefs: undefined | Partial<ManifestSlices> = undefined;
let manifest: DestinyManifest;
const name: string = "manifest-version";

const defLoadPromise = (async () => {
  manifest = await FetchManifest();
  const localManifestVersion = localStorage.getItem(name);

  if (manifest?.version !== localManifestVersion) {
    await updateDefinitions();
  }

  const storedDefinitions = await Promise.all(
    requiredDefinitions.map(async (requiredDefinition) => {
      const def = await get(requiredDefinition);
      return { key: requiredDefinition, value: def };
    })
  );

  const updatedDefinitions: { key: DestinyManifestComponentName; value: any }[] = await Promise.all(
    storedDefinitions.map(async (storedDefinition) => {
      if (storedDefinition.value) return storedDefinition;

      console.log(`missing ${storedDefinition.key}`);
      return await updateSingleDefinition(storedDefinition.key);
    })
  );

  localStorage.setItem(name, manifest.version);
  allDefs = updatedDefinitions.reduce((a, v) => ({ ...a, [v.key]: v.value }), {});
})();

async function updateDefinitions(definitionsToUpdate: DestinyManifestComponentName[] = requiredDefinitions) {
  return await Promise.all(
    definitionsToUpdate.map((requiredDefinition) => {
      return updateSingleDefinition(requiredDefinition);
    })
  );
}

async function updateSingleDefinition(definitionToUpdate: DestinyManifestComponentName) {
  const def = await FetchDefinition(definitionToUpdate, manifest);

  set(definitionToUpdate, def);
  return { key: definitionToUpdate, value: def };
}

export function ensureDefs() {
  if (allDefs) return;
  throw defLoadPromise;
}

export default function GetAllDefinitions() {
  return allDefs;
}
