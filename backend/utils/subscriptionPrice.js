export const getSubscriptionAmount = (plan) => {
  if (plan === "monthly") return 100;
  if (plan === "yearly") return 1000;

  return 0;
};