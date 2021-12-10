import { EmojiProps } from "../models/EmojiProps";

const Emoji: React.FC<EmojiProps> = ({ title, symbol }) => {
  return (
    <div
      data-testid={title}
      title={title}
      className="col-4 col-md-3 col-lg-2 emoji"
    >
      {symbol}
    </div>
  );
};

export default Emoji;
