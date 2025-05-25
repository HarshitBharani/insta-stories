import { useEffect, useState } from "react";
import storiesData from "../data/stories.json";
import "./storyViewer.css";

interface Props {
  startIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<Props> = ({ startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const [loading, setLoading] = useState(true);

  const currentStory = storiesData[index];

  useEffect(() => {
    setLoading(false);
    const timer = setTimeout(() => {
      goNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  const goNext = () => {
    if (index < storiesData.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const goBack = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    } else {
      onClose();
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const tapX = e.clientX;
    const screenWidth = window.innerWidth;

    if (tapX < screenWidth / 2) {
      goBack();
    } else {
      goNext();
    }
  };

  return (
    <div className="story-viewer" onClick={handleTap}>
      {loading && <div className="loader">Loading...</div>}
      <img
        src={currentStory.image}
        alt={`Story ${currentStory.id}`}
        className={`story-image ${!loading ? "loaded" : ""}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default StoryViewer;
