import axios from "axios";
import { CookieParseOptions } from "cookie";
import { NextApiRequest, NextPageContext } from "next";
import { parseCookies } from "nookies";

export default function getAPIClient(
  ctx?:
    | Pick<NextPageContext, "req">
    | {
        req: NextApiRequest;
      }
    | {
        req: Request;
      }
    | null
    | undefined,
  options?: CookieParseOptions,
) {
  const { nextauth_token: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  api.interceptors.request.use((config) => {
    console.log({ interceptor: config.headers.Authorization });

    return config;
  });

  return api;
}
