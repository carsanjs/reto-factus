const URL_API = process.env.NEXT_PUBLIC_URL_API;
const CI = process.env.NEXT_PUBLIC_CLIENT_ID;
const CE = process.env.NEXT_PUBLIC_CLIENTE_SECRET;

export const ENV = {
  URL_API: `https://${URL_API}`,
  CI: CI as string,
  CE: CE as string,
  ENDPOINTS: {
    AUTH: {
      AUTH: "/oauth/token",
    },
  },
  JWT: {
    ACCESSTOKEN: "access_token",
    REFRESHTOKEN: "refresh_token",
  },
};
