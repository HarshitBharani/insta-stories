import { useEffect, useState } from "react";
import "./StoryList.css";
import storiesData from "../data/stories.json";
import { Story } from "../types";
interface StoryListProps {
  onStorySelect: (id: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ onStorySelect }) => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    setStories(storiesData);
  }, []);
  console.log(stories);
  return (
    <div className="story-list-wrapper">
      <div className="story-list">
        {stories.map((story) => (
          <img
            key={story.id}
            src={story.image}
            alt={`Story ${story.id}`}
            className="story-thumbnail"
            onClick={() => onStorySelect(story.id - 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
