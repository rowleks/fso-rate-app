import { FlatList, View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import theme from "../context/theme";
import { repositories } from "../../utils/data";
import { formatNumber } from "../../utils";

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

const FlatListItem = ({ item }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
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
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

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
