import { FlatList } from "react-native";

// import { repositories } from "../../../utils/data";
import {
  FlatListItem,
  ItemSeparator,
  LoadingIndicator,
  NoItem,
} from "./FlatListItem";
import useRepositories from "../../hooks/useRepositories";

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={FlatListItem}
      keyExtractor={(item) => item.id.toString()}
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
