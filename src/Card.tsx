// const { data: characters } = useCharactersByIds(
//   episode.characters.map(getCharacterIdFromUrl)
// );

import { AggregatedEpisode } from "./api/aggregation";

export function Card({ episode }: { episode: AggregatedEpisode }) {
  const { characters } = episode;

  console.timeEnd("characters time");

  return (
    <div>
      <h3>{episode.episode}</h3>
      <span>{characters.map((character) => character.name).join(",")}</span>
    </div>
  );
}
