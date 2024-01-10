export const delay = (delayInMS: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delayInMS);
  });
};
