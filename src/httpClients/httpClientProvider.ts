import { HttpClientConfig } from "bungie-api-ts/http";

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

export { $definitionHttpClient, $apiKeyHttpClient };
