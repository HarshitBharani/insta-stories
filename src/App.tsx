import { useEffect, useState } from "react";
import "./App.css";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";

function App() {
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);

  const handleStorySelect = (id: number) => {
    setSelectedStoryId(id);
  };

  return (
    <div className="app-container">
      <h2 className="title">Stories</h2>
      <StoryList onStorySelect={handleStorySelect} />
      {selectedStoryId !== null && (
        <StoryViewer
          startIndex={selectedStoryId}
          onClose={() => setSelectedStoryId(null)}
        />
      )}
    </div>
  );
}

export default App;
