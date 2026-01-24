import { FlatList } from "react-native";

import { repositories } from "../../../utils/data";
import { FlatListItem, ItemSeparator } from "./FlatListItem";

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={FlatListItem}
    />
  );
};

export default RepositoryList;
