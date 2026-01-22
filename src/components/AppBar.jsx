import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../context/theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 56 + Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.medium,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("Pressed")}>
        <Text color="white" fontWeight="bold" fontSize="heading">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
