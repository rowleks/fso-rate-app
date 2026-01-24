import { StatusBar } from "expo-status-bar";

import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "./src/Main";
import createApolloClient from "./utils/apolloClient";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

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
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="light" />
    </>
  );
};

export default App;
