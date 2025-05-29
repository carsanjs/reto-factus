const URL_API = process.env.NEXT_PUBLIC_URL_API;
const CI = process.env.NEXT_PUBLIC_CLIENT_ID;
const CE = process.env.NEXT_PUBLIC_CLIENTE_SECRET;

export const ENV = {
  URL_API: `https://${URL_API}`,
  CI: CI,
  CE: CE,
  ENDPOINTS: {
    AUTH: {
      AUTH: "/oauth/token",
    },
  },
};
