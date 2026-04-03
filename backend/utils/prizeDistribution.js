export const calculatePrizes = (pool, winners) => {
  return {
    fivePrize: winners[5].length
      ? pool.fiveMatchPool / winners[5].length
      : 0,

    fourPrize: winners[4].length
      ? pool.fourMatchPool / winners[4].length
      : 0,

    threePrize: winners[3].length
      ? pool.threeMatchPool / winners[3].length
      : 0,
  };
};