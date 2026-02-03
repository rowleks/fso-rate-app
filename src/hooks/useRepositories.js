import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES, GET_REPOSITORY } from "../../graphql/queries";

const useRepositories = ({
  orderDirection = "DESC",
  orderBy = "CREATED_AT",
}) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderDirection,
      orderBy,
    },
  });

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];
  return { loading, error, repositories };
};

const useRepository = (id) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data ? data.repository : null;
  return { loading, error, repository };
};

export { useRepository, useRepositories };
