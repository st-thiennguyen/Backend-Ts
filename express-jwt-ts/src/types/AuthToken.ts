export type TokenResponse = {
  token: string;
  expires: Date;
};

export type AuthTokenResponse = {
  access: TokenResponse;
  refresh?: TokenResponse;
};
