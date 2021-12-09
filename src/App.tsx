import React, { useEffect, useState } from "react";
import "./App.css";
import { Emoji } from "./models/Emoji";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

function App() {
  const [emojis, setEmojis] = useState<Emoji[]>();
  const [search, setSearch] = useState("")
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>()
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

  return (
    <div className="App">
      <header className="headerSection">
        <h2>SalesChamp Coding Challenge</h2>
      </header>
      <section className="mainSection">
        <div className="searchBar">
          <div className="searchBox">
            <IoSearch/>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="searchField"
              autoComplete="off"
              type="text"
              name="search"
              placeholder="Search for an emoji using a keyword"
            />
          </div>
        </div>
        <section className="emojisSection">
          <div className="row">
            {filteredEmojis ?
              filteredEmojis.map((emoji) => {
                return (
                  <div title={emoji.title} key={emoji.title} className="col-4 col-md-3 col-lg-2 emoji">
                    {emoji.symbol}
                  </div>
                );
              })
              :
            emojis ?
              emojis.map((emoji) => {
                return (
                  <div title={emoji.title} key={emoji.title} className="col-4 col-md-3 col-lg-2 emoji">
                    {emoji.symbol}
                  </div>
                );
              })
            : ""
            }
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
