export const wait = (milsecs: number) => {
  return new Promise(resolve => setTimeout(resolve, milsecs));
};
