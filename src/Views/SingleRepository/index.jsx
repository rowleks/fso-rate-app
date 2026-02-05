import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "../../components/Text";
import { ItemSeparator, RepositoryInfo } from "../RepositoryList/FlatListItem";
import { useRepository } from "../../hooks/useRepositories";
import RepositoryReview from "./RepositoryReview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const singleRepository = () => {
  const { repositoryId } = useParams();
  const { repository, loading, error, fetchMore } = useRepository({
    repositoryId,
    first: 2,
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!repository) {
    return (
      <View style={styles.container}>
        <Text>Repository not found</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <RepositoryReview item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo item={repository} singleView={true} />
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default singleRepository;
