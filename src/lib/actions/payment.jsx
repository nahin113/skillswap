import { serverMutation } from "../core/server";

export const postSuccessfulPayment = async (data) => {
  return serverMutation("api/payments/confirm-session", data);
};
