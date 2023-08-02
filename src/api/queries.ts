import keyBy from "lodash/keyBy";
import uniq from "lodash/uniq";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "dataloader";
import { Character, getCharactersByIds, listEpisodes } from "./service";
import { listAggregatedEpisodes } from "./aggregation";

export const useEpisodes = () => {
  return useQuery(["episodes"], () => listEpisodes());
};

// export const characterDataLoader = new DataLoader<string, Character>(
//   async (ids) => {
//     const characters = await getCharactersByIds(uniq(ids));
//     const charactersMap = keyBy(characters, "id");
//     return ids.map((id) => charactersMap[id]);
//   },
//   {
//     cache: false, // <-- IMPORTANTE, vamos confiar no sistema de cache do react-query, não do dataloader
//   }
// );

export const useCharactersByIds = (ids: string[]) => {
  return useQuery(["characters", ids.join(",")], () =>
    getCharactersByIds(uniq(ids))
  );
};

export const useAggregatedEpisodes = () => {
  // Estamos usando react-query
  return useQuery(["episodes"], () => listAggregatedEpisodes());
};
