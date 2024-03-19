export const capitalizeFirstLetter = (string) => {
  const firstLetter = string?.charAt(0);
  const firstLetterCap = firstLetter?.toUpperCase();
  const remainingLetters = string?.slice(1);
  const capWord = firstLetterCap + remainingLetters;
  return capWord;
};
