import { useEffect, useState } from "react";
import React from "react";
import "./storyViewer.css";
import { storyInterface } from "../App";

interface Props {
  storyId: number;
  onClose: () => void;
  storyData: storyInterface[];
  setStoryData: React.Dispatch<React.SetStateAction<storyInterface[]>>;
}

const StoryViewer: React.FC<Props> = ({
  storyId,
  onClose,
  storyData,
  setStoryData,
}) => {
  const startIndex = storyData.findIndex((story) => story.id === storyId);
  const [index, setIndex] = useState(startIndex);
  const [loading, setLoading] = useState(true);

  const currentStory = storyData[index];

  const markStoryAsViewed = (storyIndex: number) => {
    if (!storyData[storyIndex].viewed) {
      setStoryData((prevData) => {
        const data = prevData.map((story, i) => {
          if (i === storyIndex) {
            console.log({ i, storyIndex });
            return { ...story, viewed: true };
          }
          return story;
        });
        console.log(data);
        return data;
      });
    }
  };
  useEffect(() => {
    setLoading(false);
    markStoryAsViewed(index);

    const timer = setTimeout(() => {
      goNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [index]);

  const goNext = () => {
    if (index < storyData.length - 1) {
      setIndex((prev) => {
        return prev + 1;
      });
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
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBack();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="story-viewer" onClick={handleTap}>
      <div key={index} className="story-progress-bar"></div>

      {loading && <div className="loader">Loading...</div>}
      <button onClick={onClose} className="close-button">
        <svg
          aria-label="Close"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Close</title>
          <polyline
            fill="none"
            points="20.643 3.357 12 12 3.353 20.647"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          ></polyline>
          <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            x1="20.649"
            x2="3.354"
            y1="20.649"
            y2="3.354"
          ></line>
        </svg>
      </button>
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
