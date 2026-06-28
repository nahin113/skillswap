import { serverFetch } from "../core/server";

export const getTasksByemail = async () => {
  return serverFetch(`api/tasks`);
};
