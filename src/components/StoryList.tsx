import "./StoryList.css";
import { storyInterface } from "../App";
interface StoryListProps {
  onStorySelect: (id: number) => void;
  storyData: storyInterface[];
}

const StoryList: React.FC<StoryListProps> = ({ onStorySelect, storyData }) => {
  return (
    <div className="story-list-wrapper">
      <div>
        <ul className="story-list">
          {storyData.map((story) => (
            <li key={story.id}>
              <div
                className={
                  story.viewed
                    ? "story-ring-wrapper viewed-story-ring"
                    : "story-ring-wrapper"
                }
              >
                <img
                  src={story.image}
                  alt={`Story ${story.id}`}
                  className="story-thumbnail-image"
                  onClick={() => onStorySelect(story.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoryList;
