import { DateTime } from "luxon";

class OauthTokensWithoutTimestamps {
  access_token: string;
  expires_in: number;
  membership_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  error?: string;
  error_description?: string;

  constructor(tokens: OauthTokensWithoutTimestamps) {
    // Initialize the properties from the base class
    this.access_token = tokens.access_token;
    this.expires_in = tokens.expires_in;
    this.membership_id = tokens.membership_id;
    this.refresh_expires_in = tokens.refresh_expires_in;
    this.refresh_token = tokens.refresh_token;
    this.token_type = tokens.token_type;
    this.error = tokens.error;
    this.error_description = tokens.error_description;
  }
}

export default class OauthTokens extends OauthTokensWithoutTimestamps {
  access_expires_at: DateTime;
  refresh_expires_at: DateTime;

  constructor(tokens: OauthTokensWithoutTimestamps) {
    super(tokens);

    this.access_expires_at = DateTime.now().plus({ seconds: tokens.expires_in - 60 });
    this.refresh_expires_at = DateTime.now().plus({ seconds: tokens.refresh_expires_in - 60 });
  }
}
