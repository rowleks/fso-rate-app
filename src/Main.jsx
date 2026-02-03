import { StyleSheet, View } from "react-native";
import RepositoryList from "./Views/RepositoryList";
import SingleRepository from "./Views/SingleRepository";
import AppBar from "./components/AppBar";
import theme from "./context/theme";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./Views/SignIn";
import CreateReview from "./Views/CreateReview";
import SignUp from "./Views/Signup";
import Reviews from "./Views/Reviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route
          path="/repository/:repositoryId"
          element={<SingleRepository />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
