import { render, screen, cleanup } from "@testing-library/react";
import Emoji from "../Emoji";
import { EmojiProps } from "../../models/EmojiProps";
import { EmojiListProps } from "../../models/EmojiListProps";
import EmojiList from "../EmojiList";

afterEach(() => {
  cleanup();
});

test("should render list of emojis", () => {
  const emojiList: EmojiListProps = {
    emojisToShow: [
      {
        title: "Smiley",
        symbol: "😃",
        keywords:
          "smiling face with open mouth happy smiley emotion emotion good good",
      },
      {
        title: "Innocent",
        symbol: "😇",
        keywords: "smiling face with halo smiley emotion emotion",
      },
    ],
  };

  render(<EmojiList emojisToShow={emojiList.emojisToShow} />);

  const emojiListElement = screen.getByTestId("emojiList");
  expect(emojiListElement).toBeInTheDocument();
});
