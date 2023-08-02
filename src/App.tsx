import { useAggregatedEpisodes } from "./api/queries";
import { Card } from "./Card";
import "./App.css";

function App() {
  const { data: episodes } = useAggregatedEpisodes();
  if (!episodes) {
    console.time("interactive time");
    console.time("characters time");
    return <div>Loading...</div>;
  }

  console.timeEnd("interactive time");

  return (
    <>
      {episodes.map((episode) => (
        <Card key={episode.id} episode={episode} />
      ))}
    </>
  );
}

export default App;
