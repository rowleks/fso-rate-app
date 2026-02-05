import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES, GET_REPOSITORY } from "../../graphql/queries";

const useRepositories = (variables) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];
  return { loading, error, repositories, fetchMore: handleFetchMore };
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
