import keyBy from "lodash/keyBy";
import uniq from "lodash/uniq";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "dataloader";
import { Character, getCharactersByIds, listEpisodes } from "./service";

export const useEpisodes = () => {
  return useQuery(["episodes"], () => listEpisodes());
};

export const characterDataLoader = new DataLoader<string, Character>(
  async (ids) => {
    const characters = await getCharactersByIds(uniq(ids));
    const charactersMap = keyBy(characters, "id");
    return ids.map((id) => charactersMap[id]);
  },
  {
    cache: false,
  }
);

export const useCharactersByIds = (ids: string[]) => {
  return useQuery(["characters", ids.join(",")], () =>
    characterDataLoader.loadMany(ids)
  );
};
