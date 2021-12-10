import { IoSearch } from "react-icons/io5";
import { SearchBarProps } from "../models/SearchBarProps";

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div data-testid="searchBar" className="searchBar">
      <div className="searchBox">
        <IoSearch />
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
  );
};

export default SearchBar;
