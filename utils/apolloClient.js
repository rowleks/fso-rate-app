import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const createApolloClient = () => {
  const { hostUri } = Constants.expoConfig;
  const uri = `http://${hostUri.split(":")[0]}:4000/graphql`;

  console.log("Connecting to", uri);
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
