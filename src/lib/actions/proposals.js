import { serverMutation } from "../core/server";

export const postProposals = async (newProposalsData) => {
  return serverMutation("api/proposals", newProposalsData);
};
