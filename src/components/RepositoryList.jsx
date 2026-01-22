import { FlatList, View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import theme from "../context/theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  itemContainer: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  infoContainer: {
    flexShrink: 1,
    gap: 8,
  },
  languageContainer: {
    padding: 6,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 4,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metricItem: {
    gap: 6,
    alignItems: "center",
  },
});

const repositories = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
  },
  {
    id: "django.django",
    fullName: "django/django",
    description: "The Web framework for perfectionists with deadlines.",
    language: "Python",
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
  },
  {
    id: "reduxjs.redux",
    fullName: "reduxjs/redux",
    description: "Predictable state container for JavaScript apps",
    language: "TypeScript",
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
  },
];

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

  const formatNumber = (num) =>
    new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(num);

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
