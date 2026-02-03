import {
  View,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Linking,
} from "react-native";
import theme from "../../context/theme";
import Text from "../../components/Text";
import { formatNumber } from "../../../utils";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.medium,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  itemContainer: {
    padding: theme.spacing.medium,
    gap: theme.spacing.medium,
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.large,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: theme.borderRadius.small,
  },
  infoContainer: {
    flexShrink: 1,
    gap: theme.spacing.small,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  languageContainer: {
    padding: theme.spacing.small,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: theme.borderRadius.small,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metricItem: {
    gap: theme.spacing.small,
    alignItems: "center",
  },
});

export const RepositoryInfo = ({ item, singleView }) => {
  const navigate = useNavigate();
  const metrics = [
    {
      label: "Stars",
      value: item.stargazersCount,
    },
    {
      label: "Forks",
      value: item.forksCount,
    },
    {
      label: "Reviews",
      value: item.reviewCount,
    },
    {
      label: "Rating",
      value: item.ratingAverage,
    },
  ];

  const handleOpenInGitHub = () => {
    if (item.url) {
      Linking.openURL(item.url).catch((e) => console.log(e));
    }
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <Pressable
        disabled={singleView}
        onPress={() => navigate(`/repository/${item.id}`)}
        style={styles.itemContainer}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: item.ownerAvatarUrl }}
            style={styles.avatar}
            resizeMode="cover"
          />

          <View style={styles.infoContainer}>
            <Text fontWeight="bold" fontSize="heading">
              {item.fullName}
            </Text>
            <Text color="textSecondary" fontSize="subheading">
              {item.description}
            </Text>

            <View style={styles.languageContainer}>
              <Text color="white" fontSize="subheading">
                {item.language}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.metricsContainer}>
          {metrics.map((m) => (
            <View style={styles.metricItem} key={m.label}>
              <Text fontWeight="bold" fontSize="heading">
                {formatNumber(m.value)}
              </Text>
              <Text color="textSecondary" fontSize="subheading">
                {m.label}
              </Text>
            </View>
          ))}
        </View>

        {singleView && (
          <View>
            <Button title="Open in GitHub" onPress={handleOpenInGitHub} />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <Text>Loading...</Text>
  </View>
);

export const NoItem = () => (
  <View style={styles.noItemContainer}>
    <Text>No Repositories Available</Text>
  </View>
);
