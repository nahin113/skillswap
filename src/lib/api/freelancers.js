import { serverFetch } from "../core/server";

export const getFreelancersList = async () => {
  return serverFetch(`api/freelancers`);
};

export const getFreelancerDetails = async (id) => {
  return serverFetch(`api/freelancers/${id}`);
};

export const getTasksByFreelancerEmail = async (email) => {
  return serverFetch(
    `api/proposals/byMail-freelancer-applied-proposal?email=${encodeURIComponent(
      email
    )}`
  );
};