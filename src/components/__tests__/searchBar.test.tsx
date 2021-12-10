import { render, screen, cleanup } from "@testing-library/react";
import SearchBar from "../SearchBar";


afterEach(() => {
  cleanup();
});

test("should render search bar", () => {
  render(
    <SearchBar search={''} setSearch={() => {}} />
  );

  const SearchBarElement = screen.getByTestId('searchBar');
  expect(SearchBarElement).toBeInTheDocument();
});
