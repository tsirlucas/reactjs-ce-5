import uniq from "lodash/uniq";

const baseUrl = "https://rickandmortyapi.com/api";

export interface Episode {
  characters: string[];
  episode: string;
  id: string;
}

export const listEpisodes = async (): Promise<Episode[]> => {
  const response = await fetch(`${baseUrl}/episode?page=1`);
  const { results } = await response.json();
  return results;
};

export interface Character {
  name: string;
  id: string;
}

export const getCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${baseUrl}/character/${id}`);
  return response.json();
};

export const getCharactersByIds = async (
  ids: string[]
): Promise<Character[]> => {
  const response = await fetch(`${baseUrl}/character/${uniq(ids).join(",")}`);
  return response.json();
};
