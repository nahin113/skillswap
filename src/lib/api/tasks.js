import { serverFetch } from "../core/server";

export const getTasksByemail = async () => {
  return serverFetch(`api/tasks/my-tasks`);
};

export const getTasks = async (queryString) => {
  return serverFetch(`api/tasks?${queryString}`);
};

export const getTaskById = async (taskId) => {
  return serverFetch(`api/tasks/${taskId}`);
};
