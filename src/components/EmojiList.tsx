import { Emoji } from "../models/Emoji";

interface EmojiListProps {
    handleScroll: (e: any) => void;
    emojisToShow: Emoji[] | undefined
}

const EmojiList: React.FC<EmojiListProps> = ({ handleScroll, emojisToShow }) => {
  return (
    <section className="emojisSection" onScroll={handleScroll}>
    <div className="row">
    {emojisToShow && emojisToShow.map((emoji) => {
          return (
            <div title={emoji.title} key={emoji.title} className="col-4 col-md-3 col-lg-2 emoji">
              {emoji.symbol}
            </div>
          );
        })}
    </div>
  </section>
  );
};

export default EmojiList;
