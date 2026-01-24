import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../../graphql/queries";

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];
  return { loading, error, repositories };
};

export default useRepositories;
