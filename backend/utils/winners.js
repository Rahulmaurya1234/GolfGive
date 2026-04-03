export const getDrawWinners = (results) => {
  return {
    5: results.filter(r => r.match === 5),
    4: results.filter(r => r.match === 4),
    3: results.filter(r => r.match === 3),
  };
};