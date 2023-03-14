import axios, { AxiosRequestConfig } from "axios";

export type ChatReq = {
  role: string;
  content: string;
};

export const getChat = async (config?: AxiosRequestConfig<any> | undefined) => {
  return await axios.get("/api/chats", config);
};

export const sendChat = async (data: ChatReq, config?: AxiosRequestConfig<any> | undefined) => {
  return await axios.post("/api/chats", data, config);
};
