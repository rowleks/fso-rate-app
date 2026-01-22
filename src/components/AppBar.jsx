import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 56 + Constants.statusBarHeight,
    backgroundColor: "#24292e",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  font: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("Pressed")}>
        <Text style={styles.font}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
