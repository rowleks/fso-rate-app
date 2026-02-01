import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepositories";
import Text from "../components/Text";
import { FlatListItem } from "./RepositoryList/FlatListItem";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const singleRepository = () => {
  const { repositoryId } = useParams();
  const { repository, loading, error } = useRepository(repositoryId);

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
        <Text>Repository not found</Text>;
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

  return (
    <View>
      <FlatListItem item={repository} singleView={true} />
    </View>
  );
};

export default singleRepository;
