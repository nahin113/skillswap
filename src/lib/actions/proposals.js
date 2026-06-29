"use server"

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const postProposals = async (newProposalsData) => {
  return serverMutation("api/proposals", newProposalsData);
};

export const updateProposal = async (id, data) => {
  const result = serverMutation(`api/proposals/${id}`, data, "PATCH");
  revalidatePath("/dashbaord/client/manageProposals");
  return result;
};