import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN, SIGN_UP } from "../../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useAuth = () => {
  const [mutate] = useMutation(SIGN_IN, {
    fetchPolicy: "no-cache",
  });

  const apolloClient = useApolloClient();

  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();

    return data;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return { signIn, signOut };
};

const useSignUp = () => {
  const [mutate] = useMutation(SIGN_UP, {
    fetchPolicy: "no-cache",
  });

  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    apolloClient.resetStore();
  };

  return [signUp];
};

export { useAuth, useSignUp };
