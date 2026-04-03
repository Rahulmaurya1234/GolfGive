export const calculatePool = (totalAmount) => {
  const pool = Number(totalAmount) || 0;

  return {
    totalPool: pool,
    fiveMatchPool: pool * 0.4,
    fourMatchPool: pool * 0.35,
    threeMatchPool: pool * 0.25
  };
};