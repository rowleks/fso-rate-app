import { useState } from "react";
import { FlatList } from "react-native";

import {
  ItemSeparator,
  LoadingIndicator,
  NoItem,
  RepositoryInfo,
} from "./FlatListItem";
import { useRepositories } from "../../hooks/useRepositories";
import SortPicker from "../../components/SortPicker";
import Text from "../../components/Text";
import SearchBar from "../../components/SearchBar";
import { useDebounce } from "use-debounce";

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedQuery] = useDebounce(searchKeyword, 500);

  let orderBy = "CREATED_AT";
  let orderDirection = "DESC";

  switch (selectedSort) {
    case "highest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "lowest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
  }

  const { repositories, loading, error, fetchMore } = useRepositories({
    orderBy,
    first: 3,
    orderDirection,
    searchKeyword: debouncedQuery,
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <>
          <SearchBar
            searchQuery={searchKeyword}
            setSearchQuery={setSearchKeyword}
          />
          <SortPicker
            selectedValue={selectedSort}
            onValueChange={setSelectedSort}
          />
        </>
      }
      renderItem={({ item }) => <RepositoryInfo item={item} />}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={loading ? LoadingIndicator : NoItem}
    />
  );
};

export default RepositoryList;
