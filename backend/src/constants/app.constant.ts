import env from "@/utils/env/env";

export const APP_NAME = process.env.APP_NAME || env.app.name;
export const PORT = process.env.PORT || env.server.port;
