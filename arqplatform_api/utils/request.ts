import { request as requestHTTP } from "http";
import { request as requestHTTPS } from "https";

const _request = process.env.ENV === "PRODUCTION" ? requestHTTPS : requestHTTP;

export const request = _request;
