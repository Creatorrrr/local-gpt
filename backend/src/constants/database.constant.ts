export const DATABASE =
  process.env.DB_DATABASE ||
  ("mongodb://mongo-admin:P%40ssW0rd@localhost:27890/openai-chatgpt?authSource=admin" as string);
