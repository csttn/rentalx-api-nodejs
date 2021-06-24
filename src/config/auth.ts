export default {
  secret_token: process.env.SECRET_JWT,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_in_token: '15m',
  expires_in_refresh_token: '30d',
  expires_refresh_token_days: 30,
};
