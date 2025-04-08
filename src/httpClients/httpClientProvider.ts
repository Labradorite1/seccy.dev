import { HttpClientConfig } from "bungie-api-ts/http";
import { getOAuthAccessToken } from "../utilities/oauthUtilities";
import NoValidTokensError from "../types/errors/NoValidTokensError";
import { PlatformErrorCodes } from "bungie-api-ts/destiny2";

async function $definitionHttpClient<T>(config: HttpClientConfig): Promise<T> {
  const response = await fetch(config.url);
  const data = await response.json();

  return data;
}

async function $apiKeyHttpClient<T>(config: HttpClientConfig): Promise<T> {
  const url = new URL(config.url);

  if (config.params) {
    Object.entries(config.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url, {
    method: config.method,
    headers: {
      "X-API-KEY": import.meta.env.VITE_BUNGIE_API_KEY,
    },
    body: JSON.stringify(config.body),
  });

  const data = await response.json();

  return data;
}

async function $authorizedHttpClient<T>(config: HttpClientConfig): Promise<T> {
  const token = await getOAuthAccessToken();

  if (!token) throw new NoValidTokensError("Access token expired");
  const url = new URL(config.url);

  if (config.params) {
    Object.entries(config.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url, {
    method: config.method,
    headers: {
      authorization: `Bearer ${token}`,
      "X-API-KEY": import.meta.env.VITE_BUNGIE_API_KEY,
    },
  });

  const data = await response.json();

  if (data.ErrorCode !== PlatformErrorCodes.Success)
    throw new Error(`${data.ErrorCode}: ${data.ErrorStatus} - ${data.Message}`);

  return data;
}

export { $definitionHttpClient, $apiKeyHttpClient, $authorizedHttpClient };
