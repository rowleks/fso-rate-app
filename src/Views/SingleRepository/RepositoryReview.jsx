import { StyleSheet, View, Alert } from "react-native";
import theme from "../../context/theme";
import Text from "../../components/Text";
import { format } from "date-fns";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";
import { useDeleteReview } from "../../hooks/useReview";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
    gap: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },

  reviewContainer: {
    flexDirection: "row",
    gap: theme.spacing.medium,
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

  reviewActionsContainer: {
    flexDirection: "row",
    gap: theme.spacing.medium,
    justifyContent: "space-evenly",
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

const ReviewActions = ({ repositoryId, reviewId }) => {
  const navigate = useNavigate();
  const deleteReview = useDeleteReview();

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteReview(reviewId);
            } catch (e) {
              console.log(e);
            }
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.reviewActionsContainer}>
      <Button
        icon="eye"
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => navigate(`/repository/${repositoryId}`)}
      >
        View repository
      </Button>
      <Button
        icon="delete"
        mode="contained"
        buttonColor={theme.colors.error}
        onPress={handleDelete}
      >
        Delete
      </Button>
    </View>
  );
};

const RepositoryReview = ({ item, singleReview = false }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.reviewContainer}>
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

        {singleReview && (
          <ReviewActions repositoryId={item.repositoryId} reviewId={item.id} />
        )}
      </View>
    </>
  );
};

export default RepositoryReview;
