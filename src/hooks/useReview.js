import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW } from "../../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating,
          text,
        },
      },
    });
    return data.createReview.repositoryId;
  };

  return [createReview, result];
};

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (id) => {
    await mutate({
      variables: {
        deleteReviewId: id,
      },
    });
    apolloClient.resetStore();
    return true;
  };

  return deleteReview;
};

export { useReview, useDeleteReview };
