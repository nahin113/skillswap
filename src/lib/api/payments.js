'use server'

import { serverFetch } from "../core/server";

export const getPayments = async () => {
  return serverFetch(`api/payments`);
};
