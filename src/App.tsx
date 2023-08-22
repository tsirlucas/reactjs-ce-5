import { useEpisodes } from "./api/queries";
import { Card } from "./Card";
import "./App.css";

function App() {
  const { data: episodes } = useEpisodes();
  if (!episodes) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {episodes.map((episode) => (
        <Card key={episode.id} episode={episode} />
      ))}
    </>
  );
}

export default App;
