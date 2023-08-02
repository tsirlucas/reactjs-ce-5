import { keyBy } from "lodash";
import {
  Character,
  Episode,
  getCharactersByIds,
  listEpisodes,
} from "./service";
import { getCharacterIdFromUrl } from "./util";

export interface AggregatedEpisode extends Omit<Episode, "characters"> {
  characters: Character[];
}

export const listAggregatedEpisodes = async (): Promise<
  AggregatedEpisode[]
> => {
  console.time("aggregation");
  const episodes = await listEpisodes();

  // Busca os ids de todos os personagens em todos os episodes, criando uma lista unica
  const charactersIds = episodes
    .map((episode) =>
      episode.characters.map((character) => {
        return getCharacterIdFromUrl(character);
      })
    )
    .flat();

  const allCharacters = await getCharactersByIds(charactersIds);

  // Cria um map de personagens { id: Personagem, id2: Personagem }
  const charactersByIds = keyBy(allCharacters, "id");

  const aggregatedEpisodes = episodes.map((episode) => {
    const characters = episode.characters.map((character) => {
      // Mapeamos a lista de ids de personagens existente em cada episodio para
      // o personagem referente ao id.
      return charactersByIds[getCharacterIdFromUrl(character)];
    });

    return {
      ...episode,
      characters,
    };
  });
  console.timeEnd("aggregation");
  // Propriedade episode === titulo. definido pela API utilizada
  return aggregatedEpisodes;
};
