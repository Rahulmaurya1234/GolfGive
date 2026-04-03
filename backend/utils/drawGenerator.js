export const generateDrawNumbers = () => {
  let numbers = [];

  while (numbers.length < 5) {
    let num = Math.floor(Math.random() * 45) + 1;

    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
};