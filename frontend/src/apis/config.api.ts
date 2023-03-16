import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";

console.debug("config.api.ts");

export type ConfigReq = {
  modelEngine: string;
  apiKey: string;
  temperature: number;
};

export const getConfig = async (params?: any, config?: AxiosRequestConfig<any> | undefined) => {
  const path = params ? queryString.stringify(params) : "";
  const url = "/api/configs" + (path ? `?${path}` : "");
  return await axios.get(url, config);
};

export const postConfig = async (data: ConfigReq, config?: AxiosRequestConfig<any> | undefined) => {
  return await axios.post("/api/configs", data, config);
};
