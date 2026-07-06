import { dataFetch, serverFetch } from "../core/server";

export const getFreelancersList = async () => {
  return dataFetch(`api/freelancers`);
};

export const getFreelancerDetails = async (id) => {
  return dataFetch(`api/freelancers/${id}`);
};

export const getEarnings = async (email) => {
  return serverFetch(`api/freelancer/earnings?email=${encodeURIComponent(email)}`);
};

export const getTasksByFreelancerEmail = async (email) => {
  return serverFetch(
    `api/proposals/byMail-freelancer-applied-proposal?email=${encodeURIComponent(
      email
    )}`
  );
};