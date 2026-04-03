export const handleJackpot = (previousJackpot, pool, winners) => {
  let jackpot = previousJackpot || 0;

  if (winners[5].length === 0) {
    jackpot += pool.fiveMatchPool;
  } else {
    jackpot = 0;
  }

  return jackpot;
};