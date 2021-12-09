import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div className="searchBar">
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
