import { Searchbar } from "react-native-paper";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      mode="view"
      theme={{ colors: { elevation: { level3: "#ccc" }, outline: "#ccc" } }}
    />
  );
};

export default SearchBar;
