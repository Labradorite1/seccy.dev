import OauthTokens from "../types/OauthTokens";

async function GetOauthTokens(code: string, isCode: boolean = false): Promise<OauthTokens | undefined> {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_BUNGIE_CLIENT_ID}:${import.meta.env.VITE_BUNGIE_CLIENT_SECRET}`
      )}`,
    },
    body: isCode
      ? `client_id=${import.meta.env.VITE_BUNGIE_CLIENT_ID}&grant_type=authorization_code&code=${code}`
      : `grant_type=refresh_token&refresh_token=${code}`,
  };

  const request = await fetch("https://www.bungie.net/Platform/App/OAuth/Token/", requestInit);
  const data = await request.json();

  if (data.error) return undefined;

  return new OauthTokens(data);
}

export { GetOauthTokens as GetOAuthAccessToken };
