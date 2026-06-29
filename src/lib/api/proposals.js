export const getProposalByEmail = async () => {
  return serverFetch(`api/proposals/my-proposals`);
};
