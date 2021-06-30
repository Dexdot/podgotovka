export const getEndingByPlural = (count: number): number => {
  if (count % 10 === 1 && count !== 11) {
    return 0;
  }
  if (
    (count % 10 === 2 && count !== 12) ||
    (count % 10 === 3 && count !== 13) ||
    (count % 10 === 4 && count !== 14)
  ) {
    return 1;
  }
  return 2;
};

interface ParamsI {
  words: [string, string, string];
  count: number;
  reverse?: boolean;
}

export const pluralize = ({
  words,
  count,
  reverse = false
}: ParamsI): string => {
  if (reverse) {
    return `${words[getEndingByPlural(count)]} ${count}`;
  }
  return `${count} ${words[getEndingByPlural(count)]}`;
};
