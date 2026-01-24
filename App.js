import { StatusBar } from "expo-status-bar";

import { NativeRouter } from "react-router-native";
import { ApolloProvier } from "@apollo/client/react";

import Main from "./src/Main";
import createApolloClient from "./utils/apolloClient";

const apolloClient = createApolloClient();

const App = () => {
  return (
    <>
      <NativeRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ApolloProvier client={apolloClient}>
          <Main />
        </ApolloProvier>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  );
};

export default App;
