export const getCharacterIdFromUrl = (url: string) => {
  return url.split("/").pop() as string;
};
