import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    env: process.env.NODE_ENV,
    apollo_uri: process.env.APOLLO_URI,
  },
});
