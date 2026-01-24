import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../../graphql/queries";

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  return { loading, error, repositories: data };
};

export default useRepositories;
