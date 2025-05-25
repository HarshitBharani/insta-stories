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
      <div className="app">
        <header className="app-header">
          <h1>My Stories</h1>
          <p className="subheading">Tap to view stories</p>
        </header>
        <StoryList onStorySelect={handleStorySelect} />
        {selectedStoryId !== null && (
          <StoryViewer
            startIndex={selectedStoryId}
            onClose={() => setSelectedStoryId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
