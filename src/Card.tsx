import { useCharactersByIds } from "./api/queries";
import { Episode } from "./api/service";
import { getCharacterIdFromUrl } from "./api/util";

export function Card({ episode }: { episode: Episode }) {
  const { data: characters } = useCharactersByIds(
    episode.characters.map(getCharacterIdFromUrl)
  );

  return (
    <div>
      <h3>{episode.episode}</h3>
      <span>
        {characters
          ? characters.map((character) => character.name).join(",")
          : "Loading..."}
      </span>
    </div>
  );
}
