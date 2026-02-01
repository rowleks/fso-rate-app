import { render, screen, waitFor, within } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import RepositoryList from "../Views/RepositoryList";
import { GET_REPOSITORIES } from "../../graphql/queries";

// 1. Define your mock data
const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: {
      data: {
        repositories: {
          edges: [
            {
              node: {
                id: "jaredpalmer.formik",
                fullName: "jaredpalmer/formik",
                description: "Build forms in React, without the tears",
                language: "TypeScript",
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  "https://avatars2.githubusercontent.com/u/4060187?v=4",
              },
            },
            {
              node: {
                id: "async-library.react-async",
                fullName: "async-library/react-async",
                description: "Flexible promise-based React data loader",
                language: "JavaScript",
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  "https://avatars1.githubusercontent.com/u/54310907?v=4",
              },
            },
          ],
        },
      },
    },
  },
];

describe("RepositoryList", () => {
  describe("when repositories are available", () => {
    it("renders loading state initially", () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <RepositoryList />
        </MockedProvider>,
      );

      // Verify loading indicator appears
      expect(screen.findAllByText(/loading/i)).toBeTruthy();
    });

    it("renders repository information", async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <RepositoryList />
        </MockedProvider>,
      );

      // Get the repository list container by testId
      const repositoryItems = await screen.findAllByTestId("repositoryItem");

      expect(repositoryItems).toHaveLength(2);

      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // Tests within the first repository item
      expect(
        within(firstRepositoryItem).getByText("jaredpalmer/formik"),
      ).toBeOnTheScreen();

      expect(
        within(firstRepositoryItem).getByText(
          "Build forms in React, without the tears",
        ),
      ).toBeOnTheScreen();

      expect(
        within(firstRepositoryItem).getByText("TypeScript"),
      ).toBeOnTheScreen();

      expect(within(firstRepositoryItem).getByText("1.6K")).toBeOnTheScreen();
      expect(within(firstRepositoryItem).getByText("21.9K")).toBeOnTheScreen();
      expect(within(firstRepositoryItem).getByText("88")).toBeOnTheScreen();
      expect(within(firstRepositoryItem).getByText("3")).toBeOnTheScreen();

      // Tests within the second repository item
      expect(
        within(secondRepositoryItem).getByText("async-library/react-async"),
      ).toBeOnTheScreen();

      expect(
        within(secondRepositoryItem).getByText(
          "Flexible promise-based React data loader",
        ),
      ).toBeOnTheScreen();

      expect(
        within(secondRepositoryItem).getByText("JavaScript"),
      ).toBeOnTheScreen();

      expect(within(secondRepositoryItem).getByText("69")).toBeOnTheScreen();
      expect(within(secondRepositoryItem).getByText("1.8K")).toBeOnTheScreen();
      expect(within(secondRepositoryItem).getByText("72")).toBeOnTheScreen();
      expect(within(secondRepositoryItem).getByText("3")).toBeOnTheScreen();
    });
  });

  describe("when there are no repositories", () => {
    it("renders empty list", async () => {
      const emptyMocks = [
        {
          request: {
            query: GET_REPOSITORIES,
          },
          result: {
            data: {
              repositories: {
                edges: [],
              },
            },
          },
        },
      ];
      render(
        <MockedProvider mocks={emptyMocks} addTypename={false}>
          <RepositoryList />
        </MockedProvider>,
      );

      // Wait for loading to finish
      await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

      const repositoryItems = screen.queryAllByTestId("repositoryItem");
      expect(repositoryItems).toHaveLength(0);
    });
  });

  describe("when network error occurs", () => {
    it("renders an error message", async () => {
      const errorMock = [
        {
          request: { query: GET_REPOSITORIES },
          error: new Error("Network error occurred"),
        },
      ];

      render(
        <MockedProvider mocks={errorMock} addTypename={false}>
          <RepositoryList />
        </MockedProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText(/Error: /i)).toBeOnTheScreen();
      });
    });
  });
});
