import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../../graphql/queries";
import { FlatList, View } from "react-native";
import RepositoryReview from "./SingleRepository/RepositoryReview";
import Text from "../components/Text";
import { ItemSeparator } from "./RepositoryList/FlatListItem";

const Reviews = () => {
  const { data, loading, error } = useQuery(GET_AUTH_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <RepositoryReview item={item} singleReview={true} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No reviews available yet</Text>
        </View>
      }
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
};

export default Reviews;
