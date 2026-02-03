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

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState("latest");

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

  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <SortPicker
          selectedValue={selectedSort}
          onValueChange={setSelectedSort}
        />
      }
      renderItem={({ item }) => <RepositoryInfo item={item} />}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={NoItem}
      contentContainerStyle={
        !repositories.length && {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }
      }
    />
  );
};

export default RepositoryList;
