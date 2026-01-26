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
    paddingHorizontal: theme.spacing.medium,
  },

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexGrow: 1,
  },
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
            Repositories
          </Text>
        </Link>
        {!user ? (
          <Link to="/signin">
            <Text color="white" fontWeight="bold" fontSize="heading">
              Sign in
            </Text>
          </Link>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Text color="white" style={{ textTransform: "capitalize" }}>
              Welcome {user}
            </Text>
            <Link onPress={handleSignOut}>
              <Text color="error" fontWeight="bold" fontSize="heading">
                Sign Out
              </Text>
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
