const getOrdinalSuffix = (num) => {
  if (num % 10 === 1 && num % 100 !== 11) return `${num}st`;
  if (num % 10 === 2 && num % 100 !== 12) return `${num}nd`;
  if (num % 10 === 3 && num % 100 !== 13) return `${num}rd`;
  return `${num}th`;
};

export default getOrdinalSuffix;