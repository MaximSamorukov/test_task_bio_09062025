export const findAllIndexes = (str: string, sub: string) => {
  const indexes = [];
  let i = str.indexOf(sub);

  while (i !== -1) {
    for (let char = 0; char < sub.length; char++) {
      const number = i + char;
      indexes.push(number);
    }
    i = str.indexOf(sub, i + sub.length);
  }
  return indexes;
};
