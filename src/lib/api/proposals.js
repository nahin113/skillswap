import { serverFetch } from "../core/server";

export const getProposalByEmail = async () => {
  return serverFetch(`api/proposals/my-proposals`);
};
export const getProposalByTaskId = async (id) => {
  return serverFetch(`api/proposals/by-task?taskId=${id}`);
};