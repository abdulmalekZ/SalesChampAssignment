import React, { useEffect, useState } from "react";
import "./App.css";
import { Emoji } from "./models/Emoji";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import EmojiList from "./components/EmojiList";

function App() {
  const [emojis, setEmojis] = useState<Emoji[]>();
  const [emojisToShow, setEmojisToShow] = useState<Emoji[]>();
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>()
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/SalesChamp/emoji-list/main/emoji-list.json`
      )
      .then((response) => {
        setEmojis(response.data);
      });
  }, []);
  
  useEffect(() => {
    if(filteredEmojis) {
      let spliced = [...filteredEmojis].splice(0,50)
      setEmojisToShow(spliced)
    } else if(emojis) {
      let spliced = [...emojis].splice(0,50)
      setEmojisToShow(spliced)
    }
  }, [emojis, filteredEmojis])

  useEffect(() => {
    if(search) {
      var filtered = emojis?.filter((emoji) => {
        let keywords = emoji.keywords.split(" ")
        let match = keywords.find(element => element.includes(search))
        return match && match.length > 0
      })
      setFilteredEmojis(filtered)
    } else {
      setFilteredEmojis(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])


  const showMoreEmojis = () => {
    if(filteredEmojis && emojisToShow) {
      if(emojisToShow.length < filteredEmojis.length) {
        let moreEmojis = emojisToShow.concat([...filteredEmojis].splice(emojisToShow.length,50))
        setEmojisToShow(moreEmojis);
      }
    } else if(emojis && emojisToShow) {
      if(emojisToShow.length < emojis.length) {
        let moreEmojis = emojisToShow.concat([...emojis].splice(emojisToShow.length,50))
        setEmojisToShow(moreEmojis);
      }
    }
  }

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 100;
    if(bottom) {
      showMoreEmojis()
    }
  }

  return (
    <div className="App">
      <header className="headerSection">
        <h2>Emoji Search</h2>
      </header>
      <section className="mainSection">
        <SearchBar search={search} setSearch={setSearch} />
        <EmojiList emojisToShow={emojisToShow} handleScroll={handleScroll} />
      </section>
    </div>
  );
}

export default App;
