import { dataFetch, serverFetch } from "../core/server";

export const getTasksByemail = async () => {
  return serverFetch(`api/tasks/my-tasks`);
};

export const getTasks = async (queryString) => {
  return dataFetch(`api/tasks?${queryString}`);
};
export const getAllTasks = async () => {
  return dataFetch(`api/tasks/all-tasks`);
};

export const getTaskById = async (taskId) => {
  return dataFetch(`api/tasks/${taskId}`);
};

export const getTaskByCategory = async (encodedCategory) => {
  return dataFetch(`api/tasksByCategory?category=${encodedCategory}`);
};

