import { EmojiProps } from "./EmojiProps";

export interface EmojiListProps {
    handleScroll?: (e: any) => void;
    emojisToShow: EmojiProps[] | undefined
}