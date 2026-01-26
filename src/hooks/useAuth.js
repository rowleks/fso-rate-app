import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../../graphql/mutations";
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

export { useAuth };
