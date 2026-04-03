export const getMatchCount = (userScores, drawNumbers) => {
  let match = 0;

  userScores.forEach(score => {
    if (drawNumbers.includes(score.value)) {
      match++;
    }
  });

  return match;
};