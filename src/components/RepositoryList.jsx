import { FlatList, View, StyleSheet, Text, Image } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
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
    <View style={{ backgroundColor: "#fff" }}>
      <View style={{ padding: 16, gap: 16 }}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            source={{ uri: item.ownerAvatarUrl }}
            width={70}
            height={70}
            resizeMode="cover"
            style={{ borderRadius: 6 }}
          />

          <View style={{ flexShrink: 1, gap: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {item.fullName}
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 16,
              }}
            >
              {item.description}
            </Text>

            <View
              style={{
                padding: 6,
                backgroundColor: "#006ad4",
                alignSelf: "flex-start",
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                {item.language}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {metrics.map((m) => (
            <View style={{ gap: 6, alignItems: "center" }} key={m.label}>
              <Text style={{ fontWeight: 600, fontSize: 18 }}>
                {formatNumber(m.value)}
              </Text>
              <Text style={{ color: "gray", fontSize: 16 }}>{m.label}</Text>
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
