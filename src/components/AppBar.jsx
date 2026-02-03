import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../context/theme";
import { Link, useNavigate } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../../graphql/queries";
import { useAuth } from "../hooks/useAuth";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 56 + Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  },

  linkContainer: { flexDirection: "row", alignItems: "center", gap: 20 },
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTH_USER, {
    fetchPolicy: "no-cache",
  });
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const user = data?.me?.username || "";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <Link to="/">
          <Text color="white" fontWeight="bold" fontSize="heading">
            Repos
          </Text>
        </Link>

        {!user ? (
          <View style={styles.linkContainer}>
            <Link to="/signin">
              <Text color="white" fontWeight="bold" fontSize="heading">
                Sign In
              </Text>
            </Link>
            <Link to="/signup">
              <Text color="white" fontWeight="bold" fontSize="heading">
                Sign Up
              </Text>
            </Link>
          </View>
        ) : (
          <View style={styles.linkContainer}>
            <Link to="/create-review">
              <Text color="white" fontWeight="bold" fontSize="heading">
                Create Review
              </Text>
            </Link>
            <Link to="/reviews">
              <Text color="white" fontWeight="bold" fontSize="heading">
                My Reviews
              </Text>
            </Link>
            <Pressable onPress={handleSignOut}>
              <Text color="error" fontWeight="bold" fontSize="heading">
                Sign Out
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
