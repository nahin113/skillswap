'use server'

import { serverFetch } from "../core/server";

export const getPayments = async () => {
  return serverFetch(`api/payments`);
};


export const getPaymentsByemail = async () => {
  return serverFetch(`api/tasks/my-payments`);
};