import { Cookies } from "react-cookie";
import OauthTokens from "../types/OauthTokens";
import { DateTime } from "luxon";
import { TOKEN_COOKIE } from "../../data/globals";
import { GetOAuthAccessToken } from "../requests/oauthRequests";
import NoValidTokensError from "../types/errors/NoValidTokensError";

const cookies = new Cookies();

function getOauthUrl() {
  return `https://www.bungie.net/en/OAuth/Authorize?client_id=${
    import.meta.env.VITE_BUNGIE_CLIENT_ID
  }&response_type=code`;
}

async function getOAuthAccessToken() {
  const cookie: OauthTokens = cookies.get(TOKEN_COOKIE);

  if (!cookie) return undefined;

  if (DateTime.fromISO(cookie.access_expires_at.toString()) > DateTime.now()) {
    //access token is valid
    return cookie.access_token;
  }

  if (DateTime.fromISO(cookie.refresh_expires_at.toString()) > DateTime.now()) {
    //refresh token is still valid
    const newTokens = await GetOAuthAccessToken(cookie.refresh_token);

    if (!newTokens) return undefined;

    saveTokens(newTokens);
    return newTokens.access_token;
  }

  throw new NoValidTokensError("Refresh token expired.");
}

function saveTokens(tokens: OauthTokens) {
  cookies.set(TOKEN_COOKIE, JSON.stringify(tokens), {
    path: "/",
    expires: tokens.refresh_expires_at.toJSDate(),
    sameSite: "strict",
  });
}

function deleteTokens() {
  cookies.remove(TOKEN_COOKIE);
}

export { getOauthUrl, getOAuthAccessToken, saveTokens, deleteTokens };
