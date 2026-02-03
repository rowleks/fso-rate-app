import { StyleSheet, View } from "react-native";
import theme from "../../context/theme";
import Text from "../../components/Text";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: theme.spacing.medium,
    gap: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },

  ratingContainer: {
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderRadius: 50 / 2,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },

  detailsContainer: {
    gap: theme.spacing.small,
    flex: 1,
  },

  user: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    textTransform: "capitalize",
  },

  createdAt: {
    fontSize: theme.fontSizes.small,
    color: "gray",
  },
});

const RepositoryReview = ({ item }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.user}>{item.user.username}</Text>
            <Text style={styles.createdAt}>
              {format(item.createdAt, "dd-MM-yyyy")}
            </Text>
          </View>
          <View>
            <Text>{item.text}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default RepositoryReview;
