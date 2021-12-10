import React, { useEffect, useState } from "react";
import "./App.css";
import { EmojiProps } from "./models/EmojiProps";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import EmojiList from "./components/EmojiList";
import Loader from "./components/Loader";

function App() {
  // initializing states using react hooks and using appropriate types
  const [loading, setLoading] = useState(false);
  const [emojis, setEmojis] = useState<EmojiProps[]>();
  const [emojisToShow, setEmojisToShow] = useState<EmojiProps[]>();
  const [filteredEmojis, setFilteredEmojis] = useState<EmojiProps[]>();
  const [search, setSearch] = useState("");

  // this effect will be called on each initial render and won't repeat
  // this effect is used to fetch the list of emojis and assign it to emojis state
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://raw.githubusercontent.com/SalesChamp/emoji-list/main/emoji-list.json`
      )
      .then((response) => {
        setLoading(false);
        setEmojis(response.data);
      });
  }, []);

  // this effect runs whenever a change occurs in the emojis or filteredEmojis state changed
  // this function helps with the infinite scroll functionality
  useEffect(() => {
    // first we need to check if we are dealing with filtered (searched) or non filtered list of emojis
    // then we will show the first (from 0 to 50) emojis from either list
    if (filteredEmojis) {
      let spliced = [...filteredEmojis].splice(0, 50);
      setEmojisToShow(spliced);
    } else if (emojis) {
      let spliced = [...emojis].splice(0, 50);
      setEmojisToShow(spliced);
    }
  }, [emojis, filteredEmojis]);

  // this effect runs whenever the value of the search text has changed
  // meaning it will run whenever a user changes the search value
  useEffect(() => {
    // if indeed there was text in the search field, then filter emojis based on whether the search text is contained in one of the keyword values of each emoji
    if (search) {
      var filtered = emojis?.filter((emoji) => {
        let keywords = emoji.keywords ? emoji.keywords.split(" ") : [];
        let match = keywords.find((element) =>
          element.includes(search.toLowerCase())
        );
        return match && match.length > 0;
      });
      setFilteredEmojis(filtered);
    } else {
      // if no text in the search value (user erased their search)
      // set filteredEmojis state as undefined to let the app know to show the original list of emojis
      setFilteredEmojis(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // this function is called whenever a user has scrolled to the end of the emoji list
  // this is part of the infinite scroll functionality, adding the next 50 emojis to the emojisToShow state
  const showMoreEmojis = () => {
    // first we need to check whether we're dealing with original list or filtered list
    if (filteredEmojis && emojisToShow) {
      if (emojisToShow.length < filteredEmojis.length) {
        let moreEmojis = emojisToShow.concat(
          [...filteredEmojis].splice(emojisToShow.length, 50)
        );
        setEmojisToShow(moreEmojis);
      }
    } else if (emojis && emojisToShow) {
      if (emojisToShow.length < emojis.length) {
        let moreEmojis = emojisToShow.concat(
          [...emojis].splice(emojisToShow.length, 50)
        );
        setEmojisToShow(moreEmojis);
      }
    }
  };

  // this function runs whenever a scroll event fires
  // it will check if the user has almost reached the end of the list, then it will ask for more emojis to show
  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 100;
    if (bottom) {
      showMoreEmojis();
    }
  };

  return (
    <div className="App">
      <header className="headerSection">
        <h2>Emoji Search</h2>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <section className="mainSection">
          <SearchBar search={search} setSearch={setSearch} />
          <EmojiList emojisToShow={emojisToShow} handleScroll={handleScroll} />
        </section>
      )}
    </div>
  );
}

export default App;
