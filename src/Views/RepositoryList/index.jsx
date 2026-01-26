import { FlatList } from "react-native";

// import { repositories } from "../../../utils/data";
import {
  FlatListItem,
  ItemSeparator,
  LoadingIndicator,
  NoItem,
} from "./FlatListItem";
import useRepositories from "../../hooks/useRepositories";
import Text from "../../components/Text";

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

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
