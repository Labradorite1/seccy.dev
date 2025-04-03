function getOauthUrl() {
  return `https://www.bungie.net/en/OAuth/Authorize?client_id=${
    import.meta.env.VITE_BUNGIE_CLIENT_ID
  }&response_type=code`;
}

export { getOauthUrl };
