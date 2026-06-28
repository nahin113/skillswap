"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const postTasks = async (newTasksData) => {
  return serverMutation("api/tasks", newTasksData);
};


export const updateTasks = async (id, data) => {
  const result = serverMutation(`api/tasks/${id}`, data, "PATCH");
  revalidatePath("/dashbaord/client/myTasks");
  return result;
};