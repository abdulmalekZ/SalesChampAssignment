import { render, screen, cleanup } from "@testing-library/react";
import Emoji from "../Emoji";
import { EmojiProps } from "../../models/EmojiProps";

afterEach(() => {
  cleanup();
});

test("should render emoji", () => {
  const emoji: EmojiProps = {
    title: "smile",
    symbol: "😃",
    keywords: "smile smiley happy",
  };

  render(
    <Emoji
      title={emoji.title}
      symbol={emoji.symbol}
      keywords={emoji.keywords}
    />
  );

  const emojiElement = screen.getByTestId(emoji.title);
  expect(emojiElement).toBeInTheDocument();
  expect(emojiElement).toHaveTextContent(emoji.symbol);
});
