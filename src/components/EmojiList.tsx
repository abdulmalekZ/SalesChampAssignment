import { EmojiListProps } from "../models/EmojiListProps";
import Emoji from "./Emoji";

const EmojiList: React.FC<EmojiListProps> = ({
  handleScroll,
  emojisToShow,
}) => {
  return (
    <section
      data-testid={"emojiList"}
      className="emojisSection"
      onScroll={handleScroll}
    >
      <div className="row">
        {emojisToShow &&
          emojisToShow.map((emoji) => {
            return (
              <Emoji
                key={emoji.title}
                title={emoji.title}
                symbol={emoji.symbol}
              />
            );
          })}
      </div>
    </section>
  );
};

export default EmojiList;
