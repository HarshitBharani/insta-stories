import { useEffect, useState } from "react";
import "./App.css";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import stories from "./data/stories.json";
export interface storyInterface {
  id: number;
  image: string;
  viewed: boolean;
}
function App() {
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [storyData, setStoryData] = useState<storyInterface[]>([]);
  const handleStorySelect = (id: number) => {
    setSelectedStoryId(id);
  };
  useEffect(() => {
    setStoryData(stories);
  }, []);

  return (
    <div className="app-container">
      <div className="app">
        <header className="app-header">
          <h1>My Stories</h1>
          <p className="subheading">Tap to view stories</p>
        </header>
        <StoryList onStorySelect={handleStorySelect} storyData={storyData} />
        {selectedStoryId !== null && (
          <StoryViewer
            storyId={selectedStoryId}
            onClose={() => setSelectedStoryId(null)}
            storyData={storyData}
            setStoryData={setStoryData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
